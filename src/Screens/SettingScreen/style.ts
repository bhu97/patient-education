import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
    },
    contactConatiner: {
        flex: 0.35,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 8,
        height: '60%',
        // for shadow of card
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
    navContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    appInfoConatiner: {
        flex: 0.6,
        flexDirection: 'column',
        borderRadius: 1,
        backgroundColor: 'white',
        padding: 8,
        height: '80%',
        // for shadow of card
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
    },
    headerTextStyle: {
        margin: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.h5,
        color: BaseThemeStyle.colors.titleColor,
        textAlign: 'left',
        paddingHorizontal: 8,
    },
    rowTextStyle: {
        margin: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
});
