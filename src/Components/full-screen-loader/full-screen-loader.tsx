import React, { Fragment, PureComponent } from 'react';
import { ActivityIndicator, Animated, Easing, Image, Text, View } from 'react-native';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface FullScreenLoaderProps {
    isLoading: boolean;
    showSpinner?: boolean;
}

interface FullScreenLoaderState {

}

export default class FullScreenLoader extends PureComponent<FullScreenLoaderProps, FullScreenLoaderState> {
    constructor(props: FullScreenLoaderProps) {
        super(props);
        this.state = {

        };
    }
    spinValue = new Animated.Value(0);

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.spinValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };


spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
})

render() {
    return (
        <Fragment>
            {this.props.isLoading && (
                <View accessible style={style.container}>
                    {this.props.showSpinner && (
                        <>
                            <View style={style.indicatorContainer}>
                                {/* <Image source={Images.loaderImage} /> */}
                                <Animated.Image
                                    style={{ transform: [{ rotate: this.spin }] }}
                                    source={Images.loaderImage} />
                                {/* <ActivityIndicator size={'large'} color={BaseThemeStyle.colors.blue}/> */}
                            </View>
                            <Text style={style.textStyle}>{BaseLocalization.pleaseWait}</Text>
                        </>
                    )}
                </View>
            )}
        </Fragment>
    );
}
}
