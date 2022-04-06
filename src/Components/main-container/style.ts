import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    wrapper: {
        flexGrow: 1,
        height: BaseThemeStyle.dimensions.heights.buttons,
        overflow: 'hidden',
    },
    button: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BaseThemeStyle.colors.success,
    },
    outline: {
        backgroundColor: BaseThemeStyle.colors.white,
        borderWidth: BaseThemeStyle.dimensions.borderWidths.buttons,
        borderColor: BaseThemeStyle.colors.success,
    },
    text: {
        ...BaseThemeStyle.fonts.button,
        color:  BaseThemeStyle.colors.white,
        textTransform: 'uppercase',
    },
    textOutline: {
        ...BaseThemeStyle.fonts.button,
        color: BaseThemeStyle.colors.success,
    },
    disabled: {
        opacity: BaseThemeStyle.decorations.opacity.disabledButtons,
    },
    hidden: {
        display: 'none',
    },
});
