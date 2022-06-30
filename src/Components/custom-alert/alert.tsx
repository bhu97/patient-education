import React, { Component } from 'react';
import ApplicationAlert, { AlertType } from './custom-alert-component';

interface errorProps {}
interface errorState {
    text: string;
    visible: boolean;
    alertType: AlertType;
}
export default class Alert extends Component<errorProps, errorState> {
    static shared: any;

    constructor(props: errorProps) {
        super(props);

        this.state = {
            visible: false,
            text: '',
            alertType: AlertType.NONE,
        };

        Alert.shared = this;
    }

    static show(text: string, alertType?: AlertType) {
        setTimeout(() => {
            this.shared?._show(text, alertType);
        }, 200);
    }

    _show = (text: string, alertType?: AlertType) => {
        this.setState({
            visible: true,
            text: text,
            alertType: alertType !== undefined ? alertType : AlertType.NONE,
        });
    };
    _hide = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <ApplicationAlert
                visible={this.state.visible}
                onPressOk={this._hide}
                alertMsg={this.state.text}
                ok={'ok'}
            />
        );
    }
}
