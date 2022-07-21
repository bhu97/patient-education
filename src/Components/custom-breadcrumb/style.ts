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

    headerText: {
        textAlign: 'center',
        ...BaseThemeStyle.fonts.subtitle1,
        color: BaseThemeStyle.colors.titleColor,
        fontWeight: '500',
        marginLeft: 5,
    },

    updatedLeft: {
        borderTopWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare / 2.0,
        borderRightWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare / 3.0,
        borderBottomWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare / 2.0,
        borderLeftWidth: 0,
        borderTopColor: BaseThemeStyle.colors.lightGray,
        borderRightColor: 'transparent',
        borderBottomColor: BaseThemeStyle.colors.lightGray,
        borderLeftColor: BaseThemeStyle.colors.lightGray,
        transform: [{ rotate: '180deg' }],
    },
    updatedRight: {
        borderTopWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare / 2.0,
        borderRightWidth: 0,
        borderBottomWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare / 2.0,
        borderLeftWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare / 3.0,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: BaseThemeStyle.colors.lightGray,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
    },
});
