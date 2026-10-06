import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  TOKEN: 'skillswap_token',
  USER: 'skillswap_user',
  SAVED_GIGS: 'skillswap_saved_gigs'
};

export const storage = {
  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (e) {
      console.warn('Error reading token from AsyncStorage', e);
      return null;
    }
  },

  async setToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (e) {
      console.warn('Error saving token to AsyncStorage', e);
    }
  },

  async getUser() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Error reading user from AsyncStorage', e);
      return null;
    }
  },

  async setUser(user) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Error saving user to AsyncStorage', e);
    }
  },

  async getSavedGigs() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_GIGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading saved gigs from AsyncStorage', e);
      return [];
    }
  },

  async setSavedGigs(gigs) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_GIGS, JSON.stringify(gigs));
    } catch (e) {
      console.warn('Error saving saved gigs to AsyncStorage', e);
    }
  },

  async clearSession() {
    try {
      await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.SAVED_GIGS]
      );
    } catch (e) {
      console.warn('Error clearing session from AsyncStorage', e);
    }
  }
};

export default storage;