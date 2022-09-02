import { Dimensions, StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width- 40,
    },
    pdfContainer: {
        flex: 1,
    },
    webViewContainer: {
        flex: 1,
    }
});