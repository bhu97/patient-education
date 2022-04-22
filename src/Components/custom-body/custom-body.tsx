import React from 'react';
import { View } from 'react-native';
import { style } from './style';

const CustomBody = (props: any) => {
    return <View style={style.body}>{props.children}</View>;
};

export default CustomBody;
