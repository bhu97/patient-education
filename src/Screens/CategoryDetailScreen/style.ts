import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

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
    navContainer:{
        paddingLeft:16,paddingRight:16
    },
    moreInfoContainer: {
        flex: 0.4,
        flexDirection: 'column',
        borderRadius: 1,
        paddingLeft: BaseThemeStyle.paddings.formElements,
        // for shadow of card
        backgroundColor: BaseThemeStyle.colors.white,
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
    bottomView: {
        padding: BaseThemeStyle.paddings.containers,
        flexDirection: 'row',
    },
});
