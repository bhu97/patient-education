import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';


export const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.containers,
        justifyContent: 'space-between'
    },
    fileConatiner: {
        flex: .55,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        borderRadius: 1,
        padding: BaseThemeStyle.paddings.containers,
    },
    moreInfoConatiner: {
        flex: .40,
        flexDirection: 'column',
        borderRadius: 1,
        backgroundColor: 'blue',
        padding: BaseThemeStyle.paddings.containers,
        // height: '60%'
    },
    botomView: {
        padding: BaseThemeStyle.paddings.containers,
        flexDirection: 'row',
    }
})