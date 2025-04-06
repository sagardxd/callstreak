import { storage } from "../../../storage/mmkv";
import { MyContact } from "../screens/ContactScreen";

type ContactGroups = {
  userInApp: MyContact[];
  userNotInApp: MyContact[];
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

const setUsersInApp = (userInApp: MyContact[]) => {
  try {
    storage.set("userInApp", JSON.stringify(userInApp));
  } catch (error) {
    console.error("Error storing userInApp:", error);
  }
};

const setUsersNotInApp = (userNotInApp: MyContact[]) => {
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

export const getUsersInApp = (): MyContact[] => {
  try {
    const stored = storage.getString("userInApp");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting userInApp from storage:", error);
    return [];
  }
};

export const getUsersNotInApp = (): MyContact[] => {
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
