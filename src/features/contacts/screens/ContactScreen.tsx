import { View, Text, Platform, PermissionsAndroid, Alert, Linking, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import reactNativeContacts from 'react-native-contacts';
import { contactSync } from '../services/contactSyncService';
import { getUsersInApp } from '../services/contacts.storage';
import uuid from 'react-native-uuid';


export type MyContact = {
    id: string
    name: string
    phoneNumber: string
}

const ContactScreen = () => {
    const [contacts, setContacts] = useState<MyContact[] | null>(null);
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
        console.log('here')
        try {
            reactNativeContacts.getAll()
                .then(async (fetchedContacts) => {
                    console.log("fetch", fetchedContacts)
                    try {
                        const arr = fetchedContacts.map(contact => ({
                            id: uuid.v4(),
                            name: contact.displayName ?? '',
                            phoneNumber: contact.phoneNumbers?.[0]?.number.replace(/\s+/g, '') ?? ''
                        }));
                        await contactSync(arr);
                        setContacts(getUsersInApp());
                    } catch (err) {
                        console.error("Contact Syncing error", err);
                    }
                })
        } catch (error) {
            console.log("Error fetching contacts", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <Text>ContactScreen</Text>
            {loading ?
                <Text>Loading</Text>
                :
                <FlatList
                    data={contacts}
                    renderItem={({ item }) => (
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Text>{item.name}</Text>
                        <Text>{item.phoneNumber}</Text>
                    </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            }
        </View>
    )
}

export default ContactScreen