import { Dimensions, StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    pdfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webViewContainer: {
        flex: 1,
    }
});