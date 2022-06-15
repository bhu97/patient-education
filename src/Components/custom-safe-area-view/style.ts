import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

const homeIndicatorHeight = Platform.OS == 'ios' && DeviceInfo.hasNotch() ? 16 : 0;

export const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        position: 'relative',
        margin: BaseThemeStyle.margin.screenContainer,
        backgroundColor:"#F2F3F5"
    },
    notchPadding: {
        paddingTop: getStatusBarHeight(),
    },
    homeIndicatorMargin: {
        marginBottom: homeIndicatorHeight,
    },
});
