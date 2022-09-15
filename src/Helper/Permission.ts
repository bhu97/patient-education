
import { Platform } from 'react-native';
import deviceManager from './DeviceManager';

export class Permissions {
    public checkPermission = async () => {
        if(Platform.OS == 'android'){ 
        var { check, PERMISSIONS, request, RESULTS, AndroidPermission } = require('react-native-permissions') ;
        let result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        let result2 = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                return false;
            case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                this.getPermission();
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                return false;
        }
        switch (result2) {
            case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                return false;
            case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                this.getPermission();
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                return false;
        }
        console.log('CHECK::', result);
    }else{
        return true
    }

        
    };

    public getPermission = async () => {
        var { check, PERMISSIONS, request, RESULTS, AndroidPermission } = require('react-native-permissions') ;
        let isAndroidDevice = deviceManager.isAndroid();
        if (isAndroidDevice) {
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
                console.log('READ', result);
            });
            await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
                console.log('WRITE', result);
            });
        } else {
        }
    };
}
const permissions = new Permissions();
export default permissions;
