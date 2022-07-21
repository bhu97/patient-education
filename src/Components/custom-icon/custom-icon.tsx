import React from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';

interface CustomIconProps {
    name: string;
    color: string;
    size: number;
    style?: StyleProp<TextStyle>;
     onIconPress?: () => void;
    accessibilityLabel?: string;
}

class CustomIcon extends React.PureComponent<CustomIconProps> {

    constructor(props: CustomIconProps) {
        super(props);
    }

    //default values to size, color and style
    static defaultProps = {
        animate: true,
        color: BaseThemeStyle.colors.iconColor,
        size: 30,
        style: {},
    }

    callBack() {
        this.props.onIconPress && this.props.onIconPress();
    }

    render() {
        return (
            <View>
                {!this.props.svg && this.props.name && (
                    <Icon
                        onPress={() => {
                            this.callBack();
                        }}
                        name={this.props.name}
                        size={this.props.size}
                        color={this.props.color}
                        style={this.props.style}
                        accessibilityLabel={this.props.accessibilityLabel}
                    />
                )}
            </ View>
        );
    }
}
export default CustomIcon;
