import React, { Fragment, PureComponent } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { BaseLocalization } from '../../Localization/BaseLocalization';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
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
                            <View style={style.indicatorContainer}>
                                <ActivityIndicator size={'large'} color={BaseThemeStyle.colors.blue} />
                                <Text>{BaseLocalization.pleaseWait}</Text>
                            </View>
                        )}
                    </View>
                )}
            </Fragment>
        );
    }
}
