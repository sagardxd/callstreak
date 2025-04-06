import { doc, serverTimestamp, setDoc } from "@react-native-firebase/firestore";
import { Store } from "../../../firestore/firestore";

type addUserProps = {
  phoneNumber: string,
  name?:string
}

export const addUser = async ({ phoneNumber, name }: addUserProps) => {
    try {
      await setDoc(
        doc(Store, 'users', phoneNumber),
        {
          name: name || null,
          createdAt: serverTimestamp()
        }
      );
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
