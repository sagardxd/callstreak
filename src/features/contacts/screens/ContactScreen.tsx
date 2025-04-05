import { View, Text, Platform, PermissionsAndroid, Alert, Linking, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Contact } from 'react-native-contacts/type';
import reactNativeContacts from 'react-native-contacts';

const ContactScreen = () => {
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

    const fetchContacts = () => {
        try {
            reactNativeContacts.getAll()
                .then((contacts) => {
                    setContacts(contacts);
                })
        } catch (error) {
            console.log("Error fetching contacts");
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
                    renderItem={({ item }) => <Text>{item.displayName}</Text>}
                    keyExtractor={(item) => item.recordID}
                />
            }
        </View>
    )
}

export default ContactScreen