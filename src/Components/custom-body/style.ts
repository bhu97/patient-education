import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    body: {
        flexGrow: 1,
        position: 'relative',
        paddingHorizontal: BaseThemeStyle.paddings.bodyHorizontal,
        paddingVertical: BaseThemeStyle.paddings.bodyVertical,
        backgroundColor: BaseThemeStyle.colors.screenBackgroundColor,
    },
});
