import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

const iconCircleSize = 45;

export const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        padding: BaseThemeStyle.paddings.containers,
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        height: 'auto',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        borderColor: BaseThemeStyle.colors.gray,
        boxShadow: '10px 10px 5px lightblue',
        alignItems: 'center',
    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headerTextStyle: {
        margin: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
        textAlign: 'left',
    },
    listView:{
        padding:5
    },
    circleIconContainer: {
        backgroundColor: BaseThemeStyle.colors.white,
        width: iconCircleSize,
        height: iconCircleSize,
        borderRadius: 0.5 * iconCircleSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        margin: BaseThemeStyle.margin.containers,
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
        color: BaseThemeStyle.colors.blue,
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
     borderRadius: 10,justifyContent: 'center', alignItems: 'center',height:675
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
