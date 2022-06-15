import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    crossIconstyle: {
        backgroundColor: BaseThemeStyle.colors.danger,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // height: 50,
        // width: 50,
        // borderRadius: 45,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    crossIconcolor: {
        color: 'white',
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
    textStyle: {
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
});
