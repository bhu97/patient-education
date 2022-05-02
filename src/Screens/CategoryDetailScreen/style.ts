import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';


export const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.containers,
        justifyContent: 'space-between'
    },
    fileContainer: {
        flex: .55,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        borderRadius: 1,
        padding: BaseThemeStyle.paddings.containers,
    },
    moreInfoContainer: {
        flex: .40,
        flexDirection: 'column',
        borderRadius: 1,
        padding: BaseThemeStyle.paddings.containers,
    },
    botomView: {
        padding: BaseThemeStyle.paddings.containers,
        flexDirection: 'row',
    }
})