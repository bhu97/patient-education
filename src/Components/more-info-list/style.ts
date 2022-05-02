import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

const iconCircleSize = 45;

export const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
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
        fontWeight: 'bold',
    },
    iconContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    imageStyle:{ 
        resizeMode: 'contain', 
        height: 200, 
        width: 'auto' 
    
    },
    flatSizeStyle:{ 
        ...BaseThemeStyle.fonts.subtitle3,
         color: BaseThemeStyle.colors.titleColor,
        fontWeight: 'bold' 
    },
    lineSeparator: {
        height: 20,
        width: '100%',
    }


});
