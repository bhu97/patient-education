import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { style } from './style';

interface CustomBottomContainerProps {}

interface CustomBottomContainerState {}

export default class CustomBottomContainer extends PureComponent<
    CustomBottomContainerProps,
    CustomBottomContainerState
> {
    constructor(props: CustomBottomContainerProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <View style={style.container}>{this.props.children}</View>;
    }
}
