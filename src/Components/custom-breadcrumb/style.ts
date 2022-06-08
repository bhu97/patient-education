import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    },
    mainContainer1: {
        flexDirection: 'row',
        backgroundColor: 'red',
    },
    rectangleContainer: {
        width: BaseThemeStyle.dimensions.widths.breadCrumbSquare,
        height: BaseThemeStyle.dimensions.heights.breadCrumbSquare,
        backgroundColor: BaseThemeStyle.colors.lightGray,
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
        borderBottomColor: BaseThemeStyle.colors.lightGray,
        alignContent: 'flex-end',
    },
    triangleLeftContainer: {
        borderLeftColor: BaseThemeStyle.colors.lightGray,
        borderRightColor: BaseThemeStyle.colors.lightGray,
        borderBottomColor: BaseThemeStyle.colors.transparent,
        alignItems: 'flex-end',
    },

    headerText: {
        textAlign: 'center',
        ...BaseThemeStyle.fonts.subtitle1,
    },
});
