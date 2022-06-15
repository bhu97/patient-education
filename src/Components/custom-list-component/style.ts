import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
    },
    customcontainerview: {
        backgroundColor: BaseThemeStyle.colors.white,
        flex: 0.8,
        // for shadow of card
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
    contentContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    textStyle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: BaseThemeStyle.colors.black,
    },
    plusIconstyle: {
        marginLeft: 'auto',
    },
    balanceContainer: {
        flex: 2,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    favoritecontainer: { flex: 1, flexDirection: 'row' },
});
