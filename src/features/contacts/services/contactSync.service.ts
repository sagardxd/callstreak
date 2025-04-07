
import { collection, getDocs, query, where } from "@react-native-firebase/firestore";
import { Store } from "../../../firestore/firestore";
import { MyContact } from "../screens/CallLogScreen";
import { firebase } from "@react-native-firebase/auth";
import { setContactsInLocalStorage } from "./contacts.storage";


export const contactSync = async (contacts: MyContact[]) => {

    const userInApp: any[] = [];
    const userNotInApp: any[] = [];
    const batchSize = 10;

    for (let i = 0; i < contacts.length; i += batchSize) {
        const currContactList = contacts.slice(i, i + batchSize).map(contact => {
            const num = contact.phoneNumber?.replace(/\D/g, ''); // remove non-digits
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
            console.log('Contacts:', contacts);

            contacts.slice(i, i + batchSize).forEach(contact => {
                // Use find instead of some
                const foundDoc = snapshot.docs.find(doc => doc.id == contact.phoneNumber.slice(-10));

                if (foundDoc) {
                    userInApp.push(contact);
                } else {
                    userNotInApp.push(contact);
                }
            });

            try {
                setContactsInLocalStorage({userInApp, userNotInApp});
            } catch (error) {
                console.error('Error saving contacts in local storage')
            }

        } catch (error) {
            console.error('Error syncing contacts:', error);
        }
    }
};

