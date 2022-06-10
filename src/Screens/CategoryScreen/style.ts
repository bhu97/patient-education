import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
    },
    flatListViewConatiner: {
        flex: 0.5,
        marginRight: '5%',
    },
    SecondflatListViewConatiner: {
        flex: 0.5,
    },
    bottomView: {
        padding: BaseThemeStyle.paddings.containers,
        flexDirection: 'row',
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
});
