import { Contact } from "react-native-contacts/type";
import { storage } from "../../../storage/mmkv";

type ContactGroups = {
  userInApp: Contact[];
  userNotInApp: Contact[];
};

export const setContactsInLocalStorage = ({ userInApp, userNotInApp }: ContactGroups) => {
  try {
    setUsersInApp(userInApp);
    setUsersNotInApp(userNotInApp);
    setContactSyncStatus(true);
  } catch (error) {
    console.error("Failed to set contacts in storage:", error);
  }
};

const setUsersInApp = (userInApp: Contact[]) => {
  try {
    storage.set("userInApp", JSON.stringify(userInApp));
  } catch (error) {
    console.error("Error storing userInApp:", error);
  }
};

const setUsersNotInApp = (userNotInApp: Contact[]) => {
  try {
    storage.set("userNotInApp", JSON.stringify(userNotInApp));
  } catch (error) {
    console.error("Error storing userNotInApp:", error);
  }
};

const setContactSyncStatus = (status: boolean) => {
  try {
    storage.set("contactSyncStatus", status);
  } catch (error) {
    console.error("Error storing contact sync status:", error);
  }
};

export const getUsersInApp = (): Contact[] => {
  try {
    const stored = storage.getString("userInApp");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting userInApp from storage:", error);
    return [];
  }
};

export const getUsersNotInApp = (): Contact[] => {
  try {
    const stored = storage.getString("userNotInApp");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting userNotInApp from storage:", error);
    return [];
  }
};

export const getContactSyncStatus = (): boolean => {
  try {
    return storage.getBoolean("contactSyncStatus") ?? false;
  } catch (error) {
    console.error("Error getting contact sync status:", error);
    return false;
  }
};
