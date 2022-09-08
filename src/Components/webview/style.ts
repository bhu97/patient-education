import { Dimensions, StyleSheet } from 'react-native';
var {width, height} = Dimensions.get('screen');

export const style = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    pdf: {
        flex:1,
        paddingTop:10,
        width:'100%',
    },
    pdfContainer: {
        flex: 1,
    },
    webViewContainer: {
        flex: 1,
    }
});