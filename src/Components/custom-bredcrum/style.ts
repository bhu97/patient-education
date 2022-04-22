import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    },
    rectangleContainer: {
        width: BaseThemeStyle.dimensions.widths.breadCrumbSquare,
        height: BaseThemeStyle.dimensions.heights.breadCrumbSquare,
        backgroundColor: BaseThemeStyle.colors.gray,
        justifyContent: 'center',
    },
    triangleContainer: {
        width: 0,
        height: 0,
        backgroundColor: BaseThemeStyle.colors.transparent,
        borderLeftWidth: BaseThemeStyle.dimensions.widths.breadCrumbBorder,
        borderRightWidth: BaseThemeStyle.dimensions.widths.breadCrumbBorder,
        borderBottomWidth: BaseThemeStyle.dimensions.widths.breadCrumbBorder * 2,
        borderStyle: 'solid',
        transform: [{ rotate: '90deg' }],
    },
    triangleRightContainer: {
        borderLeftColor: BaseThemeStyle.colors.transparent,
        borderRightColor: BaseThemeStyle.colors.transparent,
        borderBottomColor: BaseThemeStyle.colors.gray,
    },
    triangleLeftContainer: {
        borderLeftColor: BaseThemeStyle.colors.gray,
        borderRightColor: BaseThemeStyle.colors.gray,
        borderBottomColor: BaseThemeStyle.colors.transparent,
    },

    headerText: {
        textAlign: 'center',
        ...BaseThemeStyle.fonts.subtitle1,
    },
});
