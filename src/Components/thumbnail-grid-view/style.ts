import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: BaseThemeStyle.colors.white,
    },
    backgroundViewStyle: {
        flex: .5,
        margin: BaseThemeStyle.margin.containers,
    },
    imageStyle: {
     resizeMode: 'stretch',
        height: 200,
        width: 'auto',
        opacity:1
    },
    emptyImage: {
        resizeMode: 'stretch',
           height: 200,
           width: 'auto',
           opacity:1
       },
       emptyImageStyle: {
        resizeMode: 'contain',
           height: 200,
           width: 'auto',
           opacity:1
       },
       overlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'black',
        opacity:0.2
       },
    svgIconStyle:{
        position:'absolute',
        top:80,
        zIndex:5,
        marginLeft:110,
        // backgroundColor:'black',
        opacity:1
    },
    iconImageStyle: {
        height: 20,
        width: 20,
    },
    emptyIconStyle: {
       top:50,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 'auto',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        paddingTop:3,
        paddingBottom:3,
        boxShadow: '10px 10px 5px lightblue',
        alignItems: 'center',
    },
    textContainer: {
        marginHorizontal: BaseThemeStyle.margin.formElements,
        flex: 0.6,
    },
    textStyle: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    iconContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    sizeStyle: {
        ...BaseThemeStyle.fonts.subtitle3,
        color: BaseThemeStyle.colors.titleColor,
    },
     toolTipBorder:{
        borderRadius: 12.5
    },
    toolTipArrow:{
        width: 16, height: 8
    },
    toolTipContainer:{
     borderRadius: 10,justifyContent: 'center', alignItems: 'center'
    },
    toolTipOptions:{
        fontSize: 24, fontWeight: '500', padding: 10 , color:BaseThemeStyle.colors.blue
    },
    toolTipHeading:{
        fontSize: 20, fontWeight: '500', padding: 5 
    },
    toolTipOptionSeperator:{
        height: 1, width: 300, backgroundColor: 'black'
    },
    blueDotImage:{
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArrow:{
        width: '350%',
        height: 60,
    },
    centerData:{
        justifyContent:'center',
        alignItems:'center'
    },

    emptyDataText:{
        fontSize: 22, fontWeight: '500', padding: 10 ,
        marginLeft:150,
        color:BaseThemeStyle.colors.textColor
    },

});
