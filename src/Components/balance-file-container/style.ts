import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({

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
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        paddingVertical: 40,
        paddingHorizontal: 100,
    },


});
