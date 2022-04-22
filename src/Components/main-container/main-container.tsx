import React, { Component } from 'react';
import CustomSafeAreaView from '../custom-safe-area-view/custom-safe-area-view';

interface MainContainerProps {
    avoidStatusBarIOS?: boolean;
    avoidBottomNavIOS?: boolean;
}

interface MainContainerState {}

export default class MainContainer extends Component<MainContainerProps, MainContainerState> {
    constructor(props: MainContainerProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <CustomSafeAreaView
                notchPadding={this.props.avoidStatusBarIOS}
                homeIndicator={!this.props.avoidBottomNavIOS}
            >
                {this.props.children}
            </CustomSafeAreaView>
        );
    }
}
