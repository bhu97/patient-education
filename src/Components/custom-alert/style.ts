import { Dimensions, StyleSheet } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import { isTablet } from 'react-native-device-info';

export const style = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flex: 1,
    },
    popContainer: {
        minHeight: Dimensions.get('screen').width * 0.4,
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: BaseThemeStyle.colors.white,
        width: isTablet() ? '60%' : '85%',
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: BaseThemeStyle.colors.screenBackgroundColor,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popButton: {
        marginRight: '5%',
    },
    msgContainer: {
        minHeight: Dimensions.get('screen').width * 0.3,
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
   buttonContainers: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    }
});
