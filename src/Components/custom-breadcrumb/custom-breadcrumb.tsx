import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { style } from './style';

interface CustomBreadcrumbProps {
    title: string;
    isFirstCrumb?: boolean | false;
}
interface CustomBreadcrumbState {}

export default class CustomBreadcrumb extends PureComponent<CustomBreadcrumbProps, CustomBreadcrumbState> {
    constructor(props: CustomBreadcrumbProps) {
        super(props);
    }

    //first bread crumb UI
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

    //last bread crumb UI
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

    render() {
        return <>{this.props.isFirstCrumb ? this.firstBreadCrumbContent() : this.lastBreadCrumbContent()}</>;
    }
}
