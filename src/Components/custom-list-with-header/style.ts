import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

const iconCircleSize = 28;

export const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        paddingHorizontal: BaseThemeStyle.paddings.containers*2,
        paddingVertical: BaseThemeStyle.paddings.containers/2,
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        height: 'auto',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        borderColor: BaseThemeStyle.colors.gray,
        boxShadow: '10px 10px 5px lightblue',
        alignItems: 'center',
        paddingVertical:BaseThemeStyle.paddings.containers,
        paddingLeft:BaseThemeStyle.paddings.containers
    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom:BaseThemeStyle.paddings.containers
    },
    headerTextStyle: {
        ...BaseThemeStyle.fonts.subtitle0,
        color: BaseThemeStyle.colors.titleColor,
        textAlign: 'left',
        fontWeight:'400'
    },
    listView:{
        padding:5
    },
    circleIconContainer: {
        backgroundColor: BaseThemeStyle.colors.white,
        width: iconCircleSize,
        height: iconCircleSize,
        borderRadius: 0.5 * iconCircleSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginHorizontal: BaseThemeStyle.margin.formElements,
        flex: 0.6,
    },
    textStyle: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
    },
    textStyleToolTip: {
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
    },
    iconContainer: {
         flex: 0.3,
        alignItems: 'flex-end',
    },
    toolTipBorder:{
        borderRadius: 12.5,
    },
    toolTipArrow:{
        width: 16, height: 8
    },
    toolTipContainer:{
     borderRadius: 10,justifyContent: 'center', alignItems: 'center',height:650
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
        justifyContent: 'center',
        alignItems: 'center',
    }
});
