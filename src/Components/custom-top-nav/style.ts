import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        height: 125,
        backgroundColor: BaseThemeStyle.colors.white,
        shadowColor: 'black',
        opacity: 1,
        shadowRadius: 2,
        flexDirection: 'row',
        marginTop: BaseThemeStyle.margin.formElements,
        marginBottom: BaseThemeStyle.margin.formElements,
    },
    backIcon: {
        margin: BaseThemeStyle.margin.containers,
        padding: BaseThemeStyle.paddings.containers,
    },
    textContainer: {
        flex: 0.7,
        justifyContent: 'space-evenly',
    },
    titleText: {
        ...BaseThemeStyle.fonts.pageTitle,
        color: BaseThemeStyle.colors.titleColor,
    },
    subTitleText: {
        ...BaseThemeStyle.fonts.pageSubTitle,
        color: BaseThemeStyle.colors.titleColor,
        width: '80%',
    },
    imageContainer: {
        flex: 0.3,
        padding: 8,
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});
