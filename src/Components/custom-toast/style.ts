import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({

    animatedCustomTostView: {
        width: '90%',
        minHeight: 70,
        borderRadius: 4,
        position: 'absolute',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    bottomPopup: {
        width: isTablet() ? '80%' : '100%',
        minHeight: 60,
        elevation: 3,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: BaseThemeStyle.colors.danger,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowOffset: { width: 1, height: 2 },
        shadowColor: BaseThemeStyle.colors.danger,
        shadowOpacity: 0.2,
        shadowRadius: 5
    },
    popupText: {
        width: '90%',
        lineHeight: 22,
        color: BaseThemeStyle.colors.white,
    }
});