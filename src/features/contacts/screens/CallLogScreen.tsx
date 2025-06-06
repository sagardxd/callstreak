import { View, Text, Platform, PermissionsAndroid, Alert, Linking, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import reactNativeContacts from 'react-native-contacts';
import { contactSync } from '../services/contactSync.service';
import { getContactSyncStatus, getUsersInApp } from '../services/contacts.storage';
import ContactCard from '../components/ContactCard';
import { Contact } from 'react-native-contacts/type';

const CallLogScreen = () => {
    const [contacts, setContacts] = useState<Contact[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkContactPermissions();
    }, []);

    const getPermission = () => {
        if (Platform.OS === 'android') {
            return PERMISSIONS.ANDROID.READ_CONTACTS;
        } else if (Platform.OS === 'ios') {
            return PERMISSIONS.IOS.CONTACTS;
        }
        return null;
    }

    const showPermissionAlert = () => {
        Alert.alert(
            'Permission Blocked',
            'Contact permission is blocked. Please enable it from settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings()
                }
            ]
        )
    }

    const checkContactPermissions = () => {
        const permission = getPermission();
        if (!permission) return console.log("Device not suppported")
        check(permission).then((status) => {
            if (status === RESULTS.GRANTED) {
                fetchContacts();
            }
            else if (status === RESULTS.DENIED) {
                request(permission).then((newStatus) => {
                    if (newStatus === RESULTS.GRANTED) {
                        fetchContacts();
                    } else if (newStatus === RESULTS.BLOCKED) {
                        showPermissionAlert();
                    }
                });
            } else if (status === RESULTS.BLOCKED) {
                showPermissionAlert();
            }
        })
    }

    const fetchContacts = async () => {
        try {
            const contactSynced = getContactSyncStatus();

            // if contact are not synced get then from Contact List sync them
            // if (!contactSynced) {
                console.log('nhi h contact sync')
                reactNativeContacts.getAll()
                    .then(async (fetchedContacts) => {
                        try {
                            // sync contacts
                            const result = await contactSync(fetchedContacts);
                            setContacts(result.userInApp);

                        } catch (err) {
                            console.error("Contact Syncing error", err);
                        }
                    })
            // }else {
            //     console.log('contact sync fetching from local storage! Lets goo')
            // }

            // after syncing/already synced get the users in the app                 
            // setContacts(getUsersInApp());
        } catch (error) {
            console.log("Error fetching contacts", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            {loading ?
                <Text>Loading</Text>
                :
                <FlatList
                    data={contacts}
                    renderItem={({ item }) => <ContactCard item={item}/>}
                    keyExtractor={(item) => item.recordID}
                />
            }
        </View>
    )
}

export default CallLogScreen