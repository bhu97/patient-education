

import React, { useState } from 'react';
import {
    Modal,
    Text, TouchableWithoutFeedback, View
} from 'react-native';
import {style} from './style'

interface CustomModalProps {
    isVisible: boolean
    onPressClose:()=>void;
}

const CustomModal: React.FC<CustomModalProps> = (props) => {

    return (
        <Modal animationType="slide" transparent={true} visible={props.isVisible}>
            <TouchableWithoutFeedback onPress={props.onPressClose}>
                <View style={style.mainViewStyle}>
                {props.children}
                </View>
               
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CustomModal;