import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    toolTipBorder:{
        borderRadius: 12.5,
    },
    toolTipArrow:{
        width: 16, height: 8
    },
    toolTipContainer:{
     borderRadius: 10,justifyContent: 'center', alignItems: 'center',height:610
    },
    toolTipOptions:{
        fontSize: 24, fontWeight: '500', padding: 10 , color:BaseThemeStyle.colors.blue
    },
    toolTipHeading:{
        fontSize: 20, fontWeight: '500', padding: 5 
    },
    toolTipOptionSeperator:{
        height: 1, width: 300, backgroundColor: 'gray'
    },

    textStyleToolTip: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.blue,
    },
    categoryTextStyleToolTip: {
        fontSize:24,
        color: BaseThemeStyle.colors.blue,
    },
    listView:{
        padding:5
    },
    categoryListView:{
        padding:15,
        justifyContent:'center',
        alignItems:'center'
    },

});