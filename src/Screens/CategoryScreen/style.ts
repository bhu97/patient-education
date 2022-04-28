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
        marginRight: '5%'
    },
    SecondflatListViewConatiner: {
        flex: .5,
    },
    botomView: {
        padding: BaseThemeStyle.paddings.containers,
        flexDirection: 'row',
    }
})