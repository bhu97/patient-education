import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        // height: 125,
        flexDirection: 'row',
        marginTop: BaseThemeStyle.margin.formElements,
        marginBottom: BaseThemeStyle.margin.formElements,
    },
    containerShadow: {
        // for shadow of card
        backgroundColor: BaseThemeStyle.colors.white,
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },

    textContainer: {
        flex: 0.7,
        justifyContent: 'space-evenly',
        padding: 20,
    },
    smallHeaderText: {
        flex: 0.7,
        padding: 20,
        flexDirection: 'row',
        // justifyContent:'center'
    },
    titleText: {
        ...BaseThemeStyle.fonts.pageTitle,
        color: BaseThemeStyle.colors.titleColor,
        fontWeight: '500',
    },
    subTitleText: {
        ...BaseThemeStyle.fonts.pageSubTitle,
        color: BaseThemeStyle.colors.titleColor,
        width: '80%',
        fontWeight: '500',
    },
    imageContainer: {
        flex: 0.3,
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});
