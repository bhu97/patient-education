import React, { PureComponent } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { style } from './style';

export enum AlertType {
    ERROR,
    SUCCESS,
    NONE,
}

export interface appAlertProps {
    onLeftPress: () => void;
    onRightPress: () => void;
    alertMsg: string;
    ok: string;
    visible?: boolean;
    alertMsgStyle?: any;
    rightButtonText?: string;
    leftButtonText?: string;
}
class ApplicationAlert extends PureComponent<appAlertProps> {
    static defaultProps: { ok: string };
    constructor(props: appAlertProps) {
        super(props);
        this.state = { show: this.props.visible };
    }

    render() {
        const { alertMsgStyle = [{ textAlign: 'center' }] } = this.props;
        return (
            <Modal
                visible={this.props.visible}
                transparent={true}
                onShow={() => this.setState({ show: true })}
                onDismiss={() => this.setState({ show: false })}
            >
                <View style={style.container}>
                    <View style={style.popContainer}>
                        <View style={style.msgContainer}>
                            <Text style={alertMsgStyle}>{this.props.alertMsg}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                width: '100%',
                            }}
                        >
                            {this.props.leftButtonText ? (
                                <TouchableOpacity onPress={this.props.onLeftPress} style={style.buttonContainer}>
                                    <Text>{this.props.leftButtonText}</Text>
                                </TouchableOpacity>
                            ) : null}
                            {this.props.rightButtonText ? (
                                <TouchableOpacity onPress={this.props.onRightPress} style={style.buttonContainer}>
                                    <Text>{this.props.rightButtonText}</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
ApplicationAlert.defaultProps = {
    ok: 'Ok',
};
export default ApplicationAlert;
