import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
    },
    flatListViewContainer: {
        flex: 0.5,
    },
    navContainer:{
        paddingLeft:16,paddingRight:16
    },
    textStyle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor:'white',
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexGrow: 6,
        height: '85%',
    },
    secondtextStyle:{
        color: BaseThemeStyle.colors.textColor,
        fontSize: 22,
        textAlign: 'center',
        paddingVertical: 30,
        paddingHorizontal: 200,

    },
    imageViewContainer: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 8,
    },
    imageView: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 500,
        height: 420,
    },
    bottomView: {
        padding: BaseThemeStyle.paddings.containers,
    },
});
