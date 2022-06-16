import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        width: '100%',
        height: BaseThemeStyle.dimensions.heights.bottomContainer,
        flexDirection: 'column',
        backgroundColor: BaseThemeStyle.colors.white,
        justifyContent: 'center',
        // for shadow of card
        shadowColor: BaseThemeStyle.colors.gray,
        opacity: 1,
        shadowRadius: 8,
        elevation: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 5,
    },
});
