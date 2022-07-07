import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const styles: any = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        paddingBottom: 16,
        color: '#000'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 40,
        paddingBottom: 35
    },
    error: {
        paddingVertical: 16
    },
    button: {
        width: '50%',
        backgroundColor: BaseThemeStyle.colors.error,
        borderRadius: 40,
        padding: 12
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        alignContent: 'center',
        textAlign: 'center'
    }
});