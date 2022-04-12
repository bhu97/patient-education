import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { style } from './style';

interface CustomTopNavProps {
    title?: string;
    subTitle: string;
    back?: boolean;
    onPressBack?: () => void;
}

interface CustomTopNavState {}

export default class CustomTopNav extends PureComponent<CustomTopNavProps, CustomTopNavState> {
    constructor(props: CustomTopNavProps) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
                {this.props.back && (
                    <View style={style.backIcon}>
                        <TouchableOpacity onPress={this.props.onPressBack}>
                            <Text>
                                <Icon name="arrowleft" size={50} bold color="#4389BC" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {this.props.title && <Text style={style.titleContainer}>{this.props.title}</Text>}
                <View style={{}}>
                    <Text style={style.subTitle}>{this.props.subTitle}</Text>
                </View>
            </View>
        );
    }
}
