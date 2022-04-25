import React, { Component, PureComponent } from 'react';
import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent, ViewStyle, StyleProp, LayoutChangeEvent, Alert, GestureResponderEvent } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import { style } from './style';

interface CustomScrollViewProps {
    onScroll?: ((data: NativeSyntheticEvent<NativeScrollEvent>) => void);
    onInfiniteScroll?: ((data: NativeSyntheticEvent<NativeScrollEvent>) => void);
    scrollEnabled?: boolean;
    bounces?: boolean;
    handleRef?: (ref: ScrollView) => void;
    refreshControl?: React.ReactElement;
    transparent?: boolean;
}

interface CustomScrollViewState {
}

export default class CustomScrollView extends PureComponent<CustomScrollViewProps, CustomScrollViewState> {

    constructor(props: CustomScrollViewProps) {
        super(props);
        this.state = {}
    }

    private onScroll = (data: any) => {
        this.props.onScroll && this.props.onScroll(data);
    }

    private ref = (ref: any) => ref && this.props.handleRef && this.props.handleRef(ref);

    private style = [style.scrollView, !this.props.transparent && { backgroundColor: BaseThemeStyle.colors.screenBackgroundColor }]

    render() {
        return (
            <ScrollView
                style={this.style}
                showsVerticalScrollIndicator={this.props.scrollEnabled != undefined ? this.props.scrollEnabled : true}
                onScroll={this.onScroll}
                scrollEnabled={this.props.scrollEnabled != undefined ? this.props.scrollEnabled : true}
                ref={this.ref}
                bounces={this.props.bounces}
                refreshControl={this.props.refreshControl}
            >
                <View style={style.wrapper}>
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }
}