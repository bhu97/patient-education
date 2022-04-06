import React, { Component } from 'react';
import { View } from 'react-native';
import { style } from './style';

interface CustomWrapperProps {
    paddingHorizontal?: boolean;
    paddingVertical?: boolean;
}

interface CustomWrapperState {}

export default class CustomWrapper extends Component<CustomWrapperProps, CustomWrapperState> {
    constructor(props: CustomWrapperProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View
                style={[
                    style.wrapper,
                    this.props.paddingHorizontal && style.paddingHorizontal,
                    this.props.paddingVertical && style.paddingVertical,
                ]}
            >
                {this.props.children}
            </View>
        );
    }
}
