import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        width: '100%',
        height: BaseThemeStyle.dimensions.heights.bottomContainer,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: BaseThemeStyle.colors.lightGray
    },
});
