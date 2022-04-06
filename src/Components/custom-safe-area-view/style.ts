import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';

const homeIndicatorHeight = (Platform.OS == 'ios' && DeviceInfo.hasNotch()) ? 16 : 0;

export const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    notchPadding: {
        paddingTop: getStatusBarHeight(),
    },
    homeIndicatorMargin: {
        marginBottom: homeIndicatorHeight,
    }
});
