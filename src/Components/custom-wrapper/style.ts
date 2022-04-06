import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'relative',
    },
    paddingHorizontal: {
        paddingHorizontal: BaseThemeStyle.paddings.wrapperHorizontal,
    },
    paddingVertical: {
        paddingVertical: BaseThemeStyle.paddings.wrapperVertical,
    },
});
