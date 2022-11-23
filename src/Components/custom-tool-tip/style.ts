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
        flex:1,borderRadius: 10,justifyContent: 'center', alignItems: 'center',
    },
    toolTipOptions:{
        fontSize: 24, fontWeight: '500', padding: 10 , color:BaseThemeStyle.colors.blue
    },
    toolTipHeading:{
        fontSize: 20, fontWeight: '500', padding: 5 
    },
    toolTipOptionSeperator:{
        height: 1, width: 300, backgroundColor: 'gray',
        justifyContent:'center',alignItems:'center'
    },
    folderTitle:{
        fontSize: 20, marginTop: 40, marginBottom: 10, fontWeight: 'bold' 
    },
    textStyleToolTip: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.blue,
    },
    categoryTextStyleToolTip: {
        fontSize:20,
        color: BaseThemeStyle.colors.blue,
    },
    listView:{
        padding:10,
    },
    categoryListView:{
        padding:15,
        justifyContent:'center',
        alignItems:'center',
    },
    blankView:{
        height:20
    }

});