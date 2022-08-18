import React, { Fragment, PureComponent } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import Images from '../../Theme/Images';
import { style } from './style';

interface FullScreenLoaderProps {
    isLoading: boolean;
    showSpinner?: boolean;
}

interface FullScreenLoaderState {}

export default class FullScreenLoader extends PureComponent<FullScreenLoaderProps, FullScreenLoaderState> {
    constructor(props: FullScreenLoaderProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                {this.props.isLoading && (
                    <View accessible style={style.container}>
                        {this.props.showSpinner && (
                            <>
                                <View style={style.indicatorContainer}>
                                    {/* <Image source={Images.loaderImage} /> */}
                                    <ActivityIndicator size={'large'} color={BaseThemeStyle.colors.blue}/>
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
