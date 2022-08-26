import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    messageText: {  
        ...BaseThemeStyle.fonts.listTitle,
        color: BaseThemeStyle.colors.white
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BaseThemeStyle.colors.error,
        marginBottom: 100,
        borderRadius: 5,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
});