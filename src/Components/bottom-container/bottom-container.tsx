import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { style } from './style';

interface BottomContainerProps {}

interface BottomContainerState {}

export default class BottomContainer extends PureComponent<BottomContainerProps, BottomContainerState> {
    constructor(props: BottomContainerProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <View style={style.container}>{this.props.children}</View>;
    }
}
