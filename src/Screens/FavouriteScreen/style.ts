import { ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
    },
    navContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    mainContainer: {
        flex: 1,
        padding: 16,
    },
    customcontainerview: {
        backgroundColor: BaseThemeStyle.colors.white,
        flex: 0.8,
        // for shadow of card
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
    contentContainer: {
        flexDirection: 'row',
        paddingHorizontal: BaseThemeStyle.margin.subtitle,
        paddingVertical: BaseThemeStyle.margin.subtitle,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: BaseThemeStyle.colors.black,
    },

    balanceContainer: {
        flex: 2,
        paddingHorizontal: 10,
        paddingVertical: 20,
        // backgroundColor:'red'
    },
    favGridContainer: {
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
        backgroundColor: 'white',
        flex: 1,
        // flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
        justifyContent: 'space-between',
    },
    fileContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        borderRadius: 1,
        paddingLeft: BaseThemeStyle.paddings.containers,
    },
    favoritecontainer: { flex: 1, flexDirection: 'row' },
    crossIconstyle: {
        backgroundColor: BaseThemeStyle.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // height: 50,
        // width: 50,
        // borderRadius: 45,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    crossIconColor: {
        //color: BaseThemeStyle.colors.error,
        // padding: 15,
    },
    EditIconColor: {
        color: BaseThemeStyle.colors.iconColor,
        //padding: 15,
    },
    modalHeader: {
        paddingRight: 0,
        fontSize: 25,
        paddingLeft: 10,
        color: BaseThemeStyle.colors.black,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        paddingTop: 10,
        alignItems: 'flex-end',
    },
    deleteGroup: {
        backgroundColor: 'red',
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    editGroup: {
        backgroundColor: BaseThemeStyle.colors.iconColor,
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    listviewstyle: {
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainIconstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textStyleNew: {
        fontSize: 23,
        fontWeight: 'bold',
        color: BaseThemeStyle.colors.titleColor,
        paddingHorizontal: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIconstyle: {
        marginLeft: 'auto',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerView: {
        paddingHorizontal: 13,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        flex: 1,
    },
    listStyle: {
        padding: 5,
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#E5EAF6',
        height: 200,
        width: '25%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 200,
        marginLeft: 550,
    },

    cardStyle: {
        backgroundColor: '#E5EAF6',
        padding: '3%',
        width: '100%',
    },
    cardTextInputStyle: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        flexGrow: 6,
        height: '85%',
    },
    secondtextStyle: {
        color: BaseThemeStyle.colors.textColor,
        fontSize: 22,
        textAlign: 'center',
        paddingVertical: 40,
        paddingHorizontal: 100,
    },
});
