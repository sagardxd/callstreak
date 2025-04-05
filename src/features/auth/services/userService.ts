import firestore from '@react-native-firebase/firestore';

type addUserProps = {
  phoneNumber: string,
  name?:string
}

const userRef = firestore().collection('users'); 

export const addUser = async ({ phoneNumber, name }: addUserProps) => {
    try {
      await userRef.doc(phoneNumber).set({
        name: name || null,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
