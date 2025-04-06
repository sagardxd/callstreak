
import { collection, getDocs, query, where } from "@react-native-firebase/firestore";
import { Store } from "../../../firestore/firestore";
import { MyContact } from "../screens/ContactScreen";
import { firebase } from "@react-native-firebase/auth";
import { setContactsInLocalStorage } from "./contacts.storage";


export const contactSync = async (contacts: MyContact[]) => {

    const userInApp: any[] = [];
    const userNotInApp: any[] = [];
    const batchSize = 10;

    for (let i = 0; i < 10; i += batchSize) {
        const currContactList = contacts.slice(i, i + batchSize).map(contact => contact.phoneNumber);

        try {
            const snapshot = await getDocs(
                query(
                    collection(Store, 'users'),
                    where(firebase.firestore.FieldPath.documentId(), 'in', currContactList)
                )
            );

            console.log('snapshot', snapshot)

            contacts.slice(i, i + batchSize).forEach(contact => {
                // Use find instead of some
                const foundDoc = snapshot.docs.find(doc => doc.id == contact.phoneNumber);

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

