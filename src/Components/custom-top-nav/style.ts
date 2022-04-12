import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

export const style = StyleSheet.create({
    container: {
        width: '100%',
        height: BaseThemeStyle.dimensions.heights.topBars + statusBarHeight,
        marginLeft: 45,
        marginTop: 59,
        marginBottom: 41,
    },
    backIcon: {
        marginBottom: 16.38,
    },

    titleContainer: {
        fontSize: 30,
        color: '#071B45',
        fontWeight: '600',
    },
    subTitle: {
        fontSize: 20,
        color: '#071B45',
        fontWeight: '600',
    },

    titleColor: {
        color: BaseThemeStyle.colors.danger,
    },
});
