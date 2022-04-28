import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: BaseThemeStyle.colors.white,
    },
    backgroundViewStyle: {
        flex: 1,
        margin: BaseThemeStyle.margin.containers,
        borderWidth: 2,
        borderColor: BaseThemeStyle.colors.gray,
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 'auto'
    },
    iconImageStyle: {
        height: 20,
        width: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 'auto',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        borderColor: BaseThemeStyle.colors.gray,
        boxShadow: '10px 10px 5px lightblue',
        alignItems: 'center',
    },
    textContainer: {
        marginHorizontal: BaseThemeStyle.margin.formElements,
        flex: 0.6,
    },
    textStyle: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    iconContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    sizeStyle: {
        ...BaseThemeStyle.fonts.subtitle3,
        color: BaseThemeStyle.colors.titleColor,
    }
});
