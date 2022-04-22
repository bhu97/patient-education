import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { style } from './style';

interface CustomBredcrumProps {
    title: string;
    onPress?: () => void;
    isFirstCrumb?: boolean | false;
}
interface CustomBredcrumState {}

export default class CustomBredcrum extends PureComponent<CustomBredcrumProps, CustomBredcrumState> {
    constructor(props: CustomBredcrumProps) {
        super(props);
    }

    firstBreadCrumb = () => {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={style.mainContainer}>
                    <View style={style.rectangleContainer}>
                        <Text style={style.headerText} numberOfLines={1} ellipsizeMode="tail">
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={[style.triangleContainer, style.triangleRightContainer]} />
                </View>
            </TouchableOpacity>
        );
    };

    lastBreadCrumb = () => {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={style.mainContainer}>
                    <View style={[style.triangleContainer, style.triangleLeftContainer]} />
                    <View style={style.rectangleContainer}>
                        <Text style={style.headerText} numberOfLines={1} ellipsizeMode="tail">
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={[style.triangleContainer, style.triangleRightContainer]} />
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return <>{this.props.isFirstCrumb ? this.firstBreadCrumb() : this.lastBreadCrumb()}</>;
    }
}
