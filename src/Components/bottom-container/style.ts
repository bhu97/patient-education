import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.danger,
    },
});
