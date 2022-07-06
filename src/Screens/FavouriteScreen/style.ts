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
        padding: 20,
      
    },
    textStyle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: BaseThemeStyle.colors.black,
    },
    plusIconstyle: {
        marginLeft: 215,  
    },
    balanceContainer: {
        flex: 2,
        paddingHorizontal: 10,
        paddingVertical: 20,
     
    },
    favoritecontainer: { flex: 1, flexDirection: 'row' },
    crossIconstyle: {
        backgroundColor: BaseThemeStyle.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        // height: 50,
        // width: 50,
        // borderRadius: 45,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    crossIconcolor: {
        color: '#ED484F',
        padding:15
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
        marginLeft:10
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
    containerView:{ 
         paddingHorizontal: 13, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' ,
        paddingVertical: 5, 
   
    },
    listStyle:{ 
     padding:10
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
        backgroundColor : "#E5EAF6",   
        height: 200 ,  
        width: '25%',  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: '#fff',    
        marginTop: 200,  
        marginLeft: 550,  
      },
     
      cardStyle: {
        backgroundColor : "#E5EAF6", 
        padding: '3%',
        width:'100%'
       
      },
      cardTextInputStyle: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        fontSize: 24,
      },
});
