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
        borderWidth: 2,
        borderColor: BaseThemeStyle.colors.gray,
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 'auto'
    },
    iconImageStyle: {
        height: 20,
        width: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 'auto',
        backgroundColor: BaseThemeStyle.colors.listItemBackgroundColor,
        borderColor: BaseThemeStyle.colors.gray,
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
        justifyContent: 'center',
        alignItems: 'center',
    }

});
