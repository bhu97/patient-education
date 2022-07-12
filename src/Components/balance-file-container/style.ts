import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    textStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        // paddingHorizontal: 30,
        // paddingVertical: 20,
    },
    fileContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        borderRadius: 1,
        paddingLeft: BaseThemeStyle.paddings.containers,
     
    },
    mainContainer: {
        // for shadow of card
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
         backgroundColor: 'white',
        flex: 1,
        // flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
        justifyContent: 'space-between',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        flexGrow: 6,
        height: '85%',
    },
    secondtextStyle: {
        color: BaseThemeStyle.colors.textColor,
        fontSize: 22,
        textAlign: 'center',
        paddingVertical: 40,
        paddingHorizontal: 100,
    },
});
