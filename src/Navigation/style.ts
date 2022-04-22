import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    tabMainContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        width: '11%',
        backgroundColor: BaseThemeStyle.colors.blue,
    },
    tabLogo: {
        position: 'absolute',
        top: 60,
    },
    logoSize: {
        width: 70,
        height: 70,
    },
    screenContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '89%',
        left: '11%',
    },
    iconContainer: {
        justifyContent: 'space-between',
        width: '100%',
    },
    focused: {
        backgroundColor: BaseThemeStyle.colors.white,
    },
    unfocused: {
        backgroundColor: BaseThemeStyle.colors.blue,
    },
    tabIconContainer: {
        paddingVertical: 25,
    },
    tabIcon: {
        alignSelf: 'center',
    },
});
