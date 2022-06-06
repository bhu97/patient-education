import { StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

export const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        elevation: 101,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicatorContainer: {
        width: 100,
        height: 100,
        backgroundColor: BaseThemeStyle.colors.lightGray,
        opacity: .8,
        borderRadius: BaseThemeStyle.dimensions.borderRadiuses.containers,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle:{
        fontSize:22,
        color: BaseThemeStyle.colors.blue,
        marginTop:20
    }
});