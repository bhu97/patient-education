import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    button: {
        width: '100%',
        height: BaseThemeStyle.dimensions.heights.buttons,
        backgroundColor: BaseThemeStyle.colors.success,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rounded: {
        borderRadius: BaseThemeStyle.dimensions.borderRadiuses.buttons,
    },
    outline: {
        backgroundColor: BaseThemeStyle.colors.black,
        borderWidth: BaseThemeStyle.dimensions.borderWidths.buttons,
        borderColor: BaseThemeStyle.colors.error,
    },
    text: {
        ...BaseThemeStyle.fonts.button,
        color: BaseThemeStyle.colors.warning,
        textTransform: 'uppercase',
    },
    textOutline: {
        ...BaseThemeStyle.fonts.button,
        color: BaseThemeStyle.colors.gray,
        textTransform: 'uppercase',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    disabled: {
        opacity: BaseThemeStyle.decorations.opacity.disabledButtons,
    },
    hidden: {
        display: 'none',
    },
});