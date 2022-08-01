import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
const iconCircleSize = 45;
export const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
        justifyContent: 'space-between',
    },
    fileContainer: {
        flex: 0.58,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        borderRadius: 1,
        paddingLeft: BaseThemeStyle.paddings.containers,
        // for shadow of card
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
    navContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    moreInfoContainer: {
        flex: 0.4,
        flexDirection: 'column',
        borderRadius: 1,
        // paddingLeft: BaseThemeStyle.paddings.formElements,
        // for shadow of card
        backgroundColor: BaseThemeStyle.colors.white,
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
    mainContainerForCard: {
        flexDirection: 'column',
        marginTop:10,
        padding:16,
    },
    itemContainer: {
        flexDirection: 'row',
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
        margin: BaseThemeStyle.margin.containers,
    },
    folderTextContainer: {
        marginHorizontal: BaseThemeStyle.margin.formElements,
        flex: 0.8,
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
    seperator:{
        height: 1, width: "92%", backgroundColor: 'gray',
        marginLeft:16,marginRight:16,
        marginTop:8
    },
});
