import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { style } from './style';

interface CustomSafeAreaViewProps {
    notchPadding?: boolean;
    homeIndicator?: boolean;
}

interface CustomSafeAreaViewState {}

export default class CustomSafeAreaView extends Component<CustomSafeAreaViewProps, CustomSafeAreaViewState> {
    constructor(props: CustomSafeAreaViewProps) {
        super(props);
    }

    render() {
        if (Platform.OS == 'ios') {
            return (
                <KeyboardAvoidingView
                    style={[
                        style.container,
                        this.props.notchPadding && style.notchPadding,
                        this.props.homeIndicator && style.homeIndicatorMargin,
                    ]}
                    behavior={'padding'}
                >
                    {this.props.children}
                </KeyboardAvoidingView>
            );
        } else {
            return <View style={style.container}>{this.props.children}</View>;
        }
    }
}
