import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';


export const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between'
    },
    contactConatiner: {
        flex: .35,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 8,
        height: '50%'
    },
    appInfoConatiner: {
        flex: .60,
        flexDirection: 'column',
        borderRadius: 1,
        backgroundColor: 'white',
        padding: 8,
        height: '60%'
    },
    rowTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextStyle: {
        margin: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.h5,
        color: BaseThemeStyle.colors.titleColor,
        textAlign: 'left',
        paddingHorizontal: 8,
    },
    rowTextStyle: {
        margin: BaseThemeStyle.margin.containers,
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.titleColor,
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxView: {
        justifyContent: 'center',
        flex: .5,
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: .5,
    },
    horizontalline: {
        borderBottomColor: BaseThemeStyle.colors.black,
        borderBottomWidth: 1.5,
        alignItems: 'center',
        padding: 15,
    },

})