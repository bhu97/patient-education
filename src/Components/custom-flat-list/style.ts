import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: BaseThemeStyle.colors.white,
        flex: 1,
        alignItems: 'center',
        // justifyContent:'center'
    },
    textStyle: {
        flex: 0.6,
        alignContent: 'flex-start',
        paddingLeft: BaseThemeStyle.paddings.listElement,
        ...BaseThemeStyle.fonts.subtitle0,
        color: BaseThemeStyle.colors.iconColor,
    },
    imageViewStyle: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-end',
        padding: 8,
        alignItems: 'flex-end',
    },
    imageStyle: {
        height: 20,
        width: 20,
    },
    lineSeparator: {
        height: 20,
        width: '100%',
    },
    toolTipBorder: {
        borderRadius: 12.5,
    },
    toolTipArrow: {
        width: 16,
        height: 8,
    },
    toolTipContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolTipOptions: {
        fontSize: 24,
        fontWeight: '500',
        padding: 10,
        color: BaseThemeStyle.colors.blue,
    },
    toolTipHeading: {
        fontSize: 20,
        fontWeight: '500',
        padding: 5,
    },
    toolTipOptionSeperator: {
        height: 1,
        width: 300,
        backgroundColor: 'black',
    },
    blueDotImage: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArrow: {
        width: '350%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
