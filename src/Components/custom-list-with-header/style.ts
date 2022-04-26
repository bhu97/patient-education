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
    iconContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
});
