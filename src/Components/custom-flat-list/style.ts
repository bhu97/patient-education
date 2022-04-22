import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 13,
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: '#4389BC',
        fontSize: 16,
        fontWeight: 'bold',
        alignContent: 'flex-start',
    }
});
