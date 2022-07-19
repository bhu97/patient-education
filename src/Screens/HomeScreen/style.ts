import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
    },
    flatListViewContainer: {
        flex: 0.4,
    },
    navContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    textStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexGrow: 6,
        height: '85%',
    },
    secondtextStyle: {
        color: BaseThemeStyle.colors.textColor,
        fontSize: 22,
        textAlign: 'center',
        paddingVertical: 30,
        paddingHorizontal: 200,
    },
    imageViewContainer: {
        flex: 0.6,
        marginLeft: 40,
        paddingTop: 40,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    imageView: {
        alignItems: 'flex-end',
        flex: 1,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
});
