import { Text, View, Modal } from 'react-native';
import React, { PureComponent } from 'react';
import { style } from './style';

interface CustomToastPopupProps {

}

interface CustomToastPopupState {
    isToastVisible: boolean;
    message: string;
}
export default class CustomToast extends PureComponent<CustomToastPopupProps, CustomToastPopupState> {
    static shared: any;
    constructor(props: CustomToastPopupProps) {
        super(props);
        this.state = {
            isToastVisible: false,
            message: ''
        };
        CustomToast.shared = this;
    }

    /**
     *
     * @param message Toast message
     * this function is to make toast self closing
     */
    showModal = (message: string) => {
        this.setState({
            message: message,
            isToastVisible: true
        });
        setTimeout(() => {
            this.setState({
                isToastVisible: false
            });
        }, 5000);
    };
    static show(message: string) {
        setTimeout(() => {
            this.shared?.showModal(message);
        }, 200);
    }

    render() {
        return (
            <Modal animationType="fade" transparent visible={this.state.isToastVisible}>
                <View style={style.mainContainer}>
                    <View style={style.messageContainer}>
                        <Text style={style.messageText}>{this.state.message}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

