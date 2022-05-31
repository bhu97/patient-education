import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements,
    },
    flatListViewContainer: {
        flex: 0.5,
    },
    imageViewContainer: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 8,
    },
    imageView: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 500,
        height: 420,
    },
    bottomView: {
        padding: BaseThemeStyle.paddings.containers,
    },
});
