import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        padding: BaseThemeStyle.paddings.formElements
    },
    flatListViewConatiner: {
        flex: .5,
    },
    imageViewConatiner: {
        flex: .5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 8
    },
    imageView: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 500,
        height: 420
    },
    botomView: {
        padding: BaseThemeStyle.paddings.containers
    }
})