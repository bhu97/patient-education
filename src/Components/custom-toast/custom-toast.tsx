import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import {style} from './style'

const height = Dimensions.get('screen').height;

export interface CustomToastProps {}

export interface CustomToastState {
    showCustomToast: boolean;
    message: string;
    CustomToastColor: any;
    position?: any;
}

export default class CustomToast extends Component<CustomToastProps, CustomToastState> {
    static shared: any;
    animateOpacityValue: any;
    timerID: any;

    constructor(props: CustomToastProps) {
        super(props);
        CustomToast.shared = this;
        this.animateOpacityValue = new Animated.Value(height);
        this.state = {
            showCustomToast: false,
            message: '',
            CustomToastColor: BaseThemeStyle.colors.blue,
            position: 'bottom'
        };
    }

    componentWillUnmount() {
        this.timerID && clearTimeout(this.timerID);
    }

    static show(message: string, duration?: number,color?:string) {
        setTimeout(() => {
            this.shared.ShowCustomToast(message, duration,color);
        }, 0);
    }

    ShowCustomToast(message: any, duration: number = 2000, color: string = BaseThemeStyle.colors.danger) {
        this.setState({ showCustomToast: true, message, CustomToastColor: color }, () => {
            Animated.timing(this.animateOpacityValue, {
                toValue: -40,
                duration: 1000,
                useNativeDriver: false
            }).start(() => this.hideCustomToast(duration));
        });
    }
    hideCustomToast = (duration: number) => {
        this.timerID = setTimeout(() => {
            Animated.timing(this.animateOpacityValue, {
                toValue: height,
                duration: duration,
                useNativeDriver: false
            }).start(() => {
                this.setState({ showCustomToast: false },()=>{
                   // console.log("this.state.showCustomToast = 64",this.state.showCustomToast);
                });
                clearTimeout(this.timerID);
            });
        }, duration);
    };
    render() {
        if (this.state.showCustomToast) {
            return (
                <Animated.View
                    style={[
                        style.animatedCustomTostView,
                        {
                            transform: [{ translateY: this.animateOpacityValue }],
                            top: this.state.position == 'top' ? height / 2 : '90%',
                        }
                    ]}
                >
                    <View style={[style.bottomPopup,{backgroundColor: this.state.CustomToastColor}]}>
                        <Text style={[ style.popupText]} numberOfLines={3}>
                            {this.state.message}
                        </Text>
                    </View>
                </Animated.View>
            );
        } else return null;
    }
}