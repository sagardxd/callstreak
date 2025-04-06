import { storage } from "../../../storage/mmkv";
import { MyContact } from "../screens/ContactScreen";

export const setUsersInApp = (userInApp: MyContact[]) => {
    storage.set('userInApp', JSON.stringify(userInApp));
}

export const getUsersInApp = () => {
    const stored = storage.getString('userInApp');
    return stored ? JSON.parse(stored) : [];
}