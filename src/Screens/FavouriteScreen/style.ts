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
        paddingHorizontal:12,
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
    listSaprator: {
        backgroundColor:BaseThemeStyle.colors.textColor,width:2,height:'100%'
    },
    modalTitle:{
        ...BaseThemeStyle.fonts.h7,
       color: BaseThemeStyle.colors.black, 
       fontWeight:'bold'
     },
     modalSubTitle:{
        ...BaseThemeStyle.fonts.h8,
       color: BaseThemeStyle.colors.lightGrayOnModal,
       marginBottom:10 
     },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        paddingTop: 10,
        alignItems: 'flex-end',
    },
    modalBottomRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop:40
        // paddingHorizontal:BaseThemeStyle.paddings.formElements,
        // paddingVertical:BaseThemeStyle.paddings.formElements,
    },
    deleteGroup: {
        // backgroundColor: 'red',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        height: '100%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    editGroup: {
        // backgroundColor: BaseThemeStyle.colors.iconColor,
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
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
    modalButton:{
        color: BaseThemeStyle.colors.blue,
        fontSize: 18, 
        fontWeight: 'bold'
    },
    cancelButton:{
        marginRight:20
    },
    modalContainer:{
justifyContent:'center',
alignItems:'center'
    },
    listStyle: {
        padding: 5,
    },
    centeredView: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    modalView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding:35,
     //    paddingHorizontal:BaseThemeStyle.paddings.formElements,
     //    paddingVertical:BaseThemeStyle.paddings.formElements,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
     //    borderWidth: 1,
     //    borderColor: 'gray',
        // width:'25%',
        borderRadius:5,
        width:350
    },

    cardStyle: {
        // backgroundColor: '#E5EAF6',
        //  padding: '3%',
        // width: '100%',
    },
    cardTextInputStyle: {
        borderBottomColor: '#4389BC',
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
