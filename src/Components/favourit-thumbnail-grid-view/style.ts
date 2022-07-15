import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: BaseThemeStyle.colors.white,
    },
    backgroundViewStyle: {
        flexBasis: 0.5,
        flexGrow:.5,
        flexShrink:.5,
        justifyContent:'space-between',
        padding:10,
        paddingLeft:0,
        paddingBottom:0, 
    },
    imageStyle: {
     resizeMode: 'stretch',
        height: 200,
        width: 'auto',
        opacity:1,
        justifyContent:'center',
        flex:1
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
           width: 200,
           
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
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    itemContainer: {
        flexDirection: 'row',
        height: 'auto',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        paddingTop:5,
        paddingBottom:5,
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
        fontSize: 22, 
        fontWeight: '500',
         padding: 10 ,
        color:BaseThemeStyle.colors.textColor
    },
    centeredViewModal: {
        flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    
     },
     modalView: {
       backgroundColor: 'white',
       justifyContent: 'flex-end',
       paddingHorizontal:BaseThemeStyle.paddings.formElements,
       paddingVertical:BaseThemeStyle.paddings.formElements,
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       elevation: 5,
       borderWidth: 1,
       borderColor: 'gray',
       width:'25%'
     
     },
     modalBottomRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            paddingHorizontal:BaseThemeStyle.paddings.formElements,
            paddingVertical:BaseThemeStyle.paddings.formElements,
        },
     cardStyle: {
       // flex:1,
       // borderRadius: 5,
       // borderWidth: 1,
       // borderColor: 'grey',
       backgroundColor: 'white',
       padding: '3%',
       // marginVertical: '5%',
       // elevation: 0.9,
     },
     cardTextInputStyle: {
       borderBottomColor: 'grey',
       borderBottomWidth: 2,
       //  marginBottom: 10,
       fontSize: 24,
     },
     modalTitle:{
        ...BaseThemeStyle.fonts.h4,
       color: BaseThemeStyle.colors.black
     }

});
