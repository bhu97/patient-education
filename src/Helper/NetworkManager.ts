import NetInfo from '@react-native-community/netinfo';
import logManager from './LogManager';

export class NetworkManager {
    /**
     * check network connection before every api call
     * if network not available returns false with resolve
     * if network available returns true with resolve
     * if any issue to check network return false with resolve
     * @returns promise with boolean
     */
    public isConnected(): Promise<boolean> {
        return new Promise((res) => {
            NetInfo.fetch()
                .then((state) => {
                    logManager.debug('network state details ', state);
                    if (state.isConnected) res(true);
                    else res(false);
                })
                .catch((innerErr) => {
                    logManager.error('network error details ', innerErr);
                    res(false);
                });
        });
    }
}

const networkManager = new NetworkManager();

export default networkManager;
