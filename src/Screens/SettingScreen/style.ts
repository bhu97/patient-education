import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    navContainer: {
        paddingHorizontal: 16
    },
    mainContainer: {
        // flexGrow: 1,
        // flexBasis:0,
        flexDirection: 'row',
        padding: 16,

    },
    contactConatiner: {
        flex: 0.5,
        flexShrink: 1,
        backgroundColor: 'white',
        marginRight: 16,
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
        marginBottom:20
    },

    appInfoConatiner: {
        flexGrow: 0.6,
        backgroundColor: 'white',
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,

    },
    rowTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:BaseThemeStyle.margin.subtitle,
    },
    headerTextStyle: {
        margin: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.h8,
        color: BaseThemeStyle.colors.titleColor,
        textAlign: 'left',
        paddingHorizontal: 8,
        fontWeight:'bold'
    },
    rowTextStyle: {
        marginHorizontal: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.subtitle0,
        color: BaseThemeStyle.colors.titleColor,
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:BaseThemeStyle.margin.subtitle,
        paddingBottom:BaseThemeStyle.margin.subtitle
    },
    boxView: {
        justifyContent: 'center',
        flex: 0.5,
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 0.5,
    },
    horizontalline: {
        borderBottomColor: BaseThemeStyle.colors.black,
        borderBottomWidth: 1.5,
        alignItems: 'center',
        padding: 15,
    },
    seprater:{
        height:1,
        backgroundColor:BaseThemeStyle.colors.textColor,
        marginHorizontal:BaseThemeStyle.margin.formElements,
        marginVertical:BaseThemeStyle.margin.subtitle
    }
});