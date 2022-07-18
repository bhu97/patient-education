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
        color:BaseThemeStyle.colors.titleColor,
        fontWeight:'600',
        marginLeft:5,
       
    },
updatedLeft:{
    borderTopWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare/2.0,
    borderRightWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare/3.0,
    borderBottomWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare/2.0,
    borderLeftWidth: 0,
    borderTopColor: BaseThemeStyle.colors.lightGray,
    borderRightColor: 'transparent',
    borderBottomColor: BaseThemeStyle.colors.lightGray,
    borderLeftColor: BaseThemeStyle.colors.lightGray,
    transform: [{ rotate: '180deg' }],
  },
  updatedRight: {
    borderTopWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare/2.0,
    borderRightWidth: 0,
    borderBottomWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare/2.0,
    borderLeftWidth: BaseThemeStyle.dimensions.heights.breadCrumbSquare/3.0,
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
