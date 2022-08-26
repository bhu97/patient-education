import { Dimensions, NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DEVICE_CONSTANT } from '../Constant/Constants';

export class DeviceManager {
    public getMobileCode(): string {
        return DeviceInfo.getUniqueId();
    }

    public getDeviceModel(): string {
        return DeviceInfo.getModel();
    }

    public getDeviceName(): Promise<string> {
        return DeviceInfo.getDeviceName();
    }

    public getDeviceType(): string {
        if (DeviceInfo.isTablet()) {
            return DEVICE_CONSTANT.tablet;
        } else {
            return DEVICE_CONSTANT.smartphone;
        }
    }

    public getOperatingSystem(): string {
        return DeviceInfo.getSystemName();
    }

    public getOperatingSystemDetail(): string {
        return DeviceInfo.getSystemVersion();
    }

    public getAndroidApiLevel(): Promise<number> {
        return DeviceInfo.getApiLevel();
    }

    public getAppVersion(): string {
        return DeviceInfo.getVersion();
    }

    public getUserAgent(): string {
        return 'ReactNative';
    }

    public getTechnologicalSolution(): string {
        let solTec: string = '';
        switch (this.getOperatingSystem()) {
            case DEVICE_CONSTANT.android:
                solTec = 'App Android';
                break;
            default:
                solTec = 'App iOS';
                break;
        }
        return solTec;
    }

    /**
     * @returns true of if device has notch
     */
    public hasNotch(): boolean {
        return DeviceInfo.hasNotch();
    }

    public getBundleId(): string {
        return DeviceInfo.getBundleId();
    }

    /**
     * The devices current width.
     * Value changes when the devices
     * orientation changes.
     */
    public width(): number {
        return Dimensions.get('window').width;
    }

    /**
     * The devices current height.
     * Value changes when the devices
     * orientation changes.
     */
    public height(): number {
        return Dimensions.get('window').height;
    }

    /**
     * True if the current device
     * is an iPad or an Android Tablet.
     */
    public isTablet(): boolean {
        return DeviceInfo.isTablet();
    }

    /**
     * True if the device is running on
     * Android.
     */
    public isAndroid(): boolean {
        return Platform.OS === 'android';
    }

    /**
     * True if the device is running on iOS.
     */
    public isiOS(): boolean {
        return Platform.OS === 'ios';
    }

    /**
     * Get default language set to device
     */
    public deviceLanguage(): string {
      
    const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

            
      //  console.log('deviceLanguage=',deviceLanguage); //en_US
        return deviceLanguage;
    }
}

const deviceManager = new DeviceManager();

export default deviceManager;
