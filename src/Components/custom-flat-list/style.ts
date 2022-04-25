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
    },
    textStyle: {
        flex: .6,
        alignContent: 'flex-start',
        padding: BaseThemeStyle.paddings.containers,
        ...BaseThemeStyle.fonts.subtitle0,
        color: BaseThemeStyle.colors.iconColor,
    },
    iamgeViewStyle: {
        flex: .4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'flex-end',
        padding: 8,
        alignItems: 'flex-end'
    },
    imageStyle: {
        height: 20,
        width: 20
    },
    lineSeparator: {
        height: 20,
        width: '100%',
    }
});
