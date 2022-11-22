import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageData = async <T>({ key, data }: { key: string; data: T }) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('ERROR: Save storage item');
  }
};

export const getAsyncStorageData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('ERROR: Get storage item');
  }
};
