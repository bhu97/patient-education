import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { style } from './style';

interface CustomBredcrumProps {
    title: string;
    onPress?: () => void;
    isFirstCrumb?: boolean | false;
    isClickDisable?: boolean | false;
}
interface CustomBredcrumState {}

export default class CustomBredcrum extends PureComponent<CustomBredcrumProps, CustomBredcrumState> {
    constructor(props: CustomBredcrumProps) {
        super(props);
    }
    firstBreadCrumbContent = () => {
        return (
            <View style={style.mainContainer}>
                <View style={style.rectangleContainer}>
                    <Text style={style.headerText} numberOfLines={1} ellipsizeMode="tail">
                        {this.props.title}
                    </Text>
                </View>
                <View style={[style.triangleContainer, style.triangleRightContainer]} />
            </View>
        );
    };

    firstBreadCrumb = () => {
        return (
            <>
                {this.props.isClickDisable ? (
                    this.firstBreadCrumbContent()
                ) : (
                    <TouchableOpacity onPress={this.props.onPress}>{this.firstBreadCrumbContent()}</TouchableOpacity>
                )}
            </>
        );
    };
    lastBreadCrumbContent = () => {
        return (
            <View style={style.mainContainer}>
                <View style={[style.triangleContainer, style.triangleLeftContainer]} />
                <View style={style.rectangleContainer}>
                    <Text style={style.headerText} numberOfLines={1} ellipsizeMode="tail">
                        {this.props.title}
                    </Text>
                </View>
                <View style={[style.triangleContainer, style.triangleRightContainer]} />
            </View>
        );
    };

    lastBreadCrumb = () => {
        return (
            <>
                {this.props.isClickDisable ? (
                    this.lastBreadCrumbContent()
                ) : (
                    <TouchableOpacity onPress={this.props.onPress}>{this.lastBreadCrumbContent()}</TouchableOpacity>
                )}
            </>
        );
    };

    render() {
        return <>{this.props.isFirstCrumb ? this.firstBreadCrumb() : this.lastBreadCrumb()}</>;
    }
}
