import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

export class SecureStorage {
    // For storing key
    static saveData = (storageKey: string, value: string) => {
        RNSecureKeyStore.set(storageKey, value, {
            accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
        }).then(() => {});
    };
    // For retrieving key
    static getData = async (storageKey: string) => {
        try {
            return await RNSecureKeyStore.get(storageKey);
        } catch (error) {
            return '';
        }
    };
    // For removing key
    static RemoveData = async (storageKey: string) => {
        try {
            return await RNSecureKeyStore.remove(storageKey);
        } catch (error) {
            return '';
        }
    };
}
