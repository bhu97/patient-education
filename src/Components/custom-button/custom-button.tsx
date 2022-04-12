import React, { PureComponent, Fragment } from 'react';
import { ActivityIndicator, Text, TouchableHighlight } from 'react-native';
import { BaseThemeStyle } from '../../Theme/BaseThemeStyle';
import { style } from './style';

interface CustomButtonProps {
    onPress: () => void;
    text: string;
    outline?: boolean;
    disabled?: boolean;
    loading?: boolean;
    rounded?: boolean;
    shadow?: boolean;
}

interface CustomButtonState {}

export default class CustomButton extends PureComponent<CustomButtonProps, CustomButtonState> {
    constructor(props: CustomButtonProps) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[
                    style.button,
                    this.props.outline && style.outline,
                    this.props.disabled && style.disabled,
                    this.props.rounded && style.rounded,
                    this.props.shadow && style.shadow,
                ]}
                underlayColor={BaseThemeStyle.colors.gray}
                disabled={this.props.disabled}
            >
                <Fragment>
                    <Text
                        style={[
                            !this.props.outline ? style.text : style.textOutline,
                            this.props.loading && style.hidden,
                        ]}
                    >
                        {this.props.text}
                    </Text>
                    <ActivityIndicator
                        style={!this.props.loading && style.hidden}
                        color={BaseThemeStyle.colors.danger}
                    />
                </Fragment>
            </TouchableHighlight>
        );
    }
}
