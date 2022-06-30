import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonStyle: {
        backgroundColor: BaseThemeStyle.colors.blue,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonLogoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
