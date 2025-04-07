
import { collection, getDocs, query, where } from "@react-native-firebase/firestore";
import { Store } from "../../../firestore/firestore";
import { firebase } from "@react-native-firebase/auth";
import { setContactsInLocalStorage } from "./contacts.storage";
import { Contact } from "react-native-contacts/type";


export const contactSync = async (contacts: Contact[]): Promise<{ userInApp: Contact[], userNotInApp: Contact[] }> => {

    const userInApp: any[] = [];
    const userNotInApp: any[] = [];
    const batchSize = 10;

    for (let i = 0; i < 10; i += batchSize) {
        const currContactList = contacts.slice(i, i + batchSize).map(contact => {
            const num = contact.phoneNumbers[0].number.replace(/\D/g, ''); // remove non-digits
            return num?.slice(-10); // get last 10 digits
        }).filter(Boolean);

        try {
            const snapshot = await getDocs(
                query(
                    collection(Store, 'users'),
                    where(firebase.firestore.FieldPath.documentId(), 'in', currContactList)
                )
            );

            console.log('Snapshot:', snapshot);
            console.log('Contacts:', currContactList);

            contacts.slice(i, i + batchSize).forEach(contact => {
                // Use find instead of some
                const foundDoc = snapshot.docs.find(doc => {
                    const cleanedNumber = contact.phoneNumbers[0].number.replace(/\D/g, '');
                    return doc.id === cleanedNumber.slice(-10);
                });

                if (foundDoc) {
                    userInApp.push(contact);
                } else {
                    userNotInApp.push(contact);
                }
            });

        } catch (error) {
            console.error('Error syncing contacts:', error);
        }

        try {
            setContactsInLocalStorage({ userInApp, userNotInApp });
        } catch (error) {
            console.error('Error saving contacts in local storage:', error);
        }

    }
    return { userInApp, userNotInApp };
};

