import React, { useState } from 'react';
import {
    Text, View
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const GroupItem = (props) => {
    const [isCheck, setCheck] = useState(props.isCheck);
    return (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <CheckBox
                    disabled={false}
                    value={isCheck}
                    onValueChange={() => {
                        setCheck(!isCheck);
                        props?.onSelect(props.id, !isCheck);
                    }}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>{props.name}</Text>
            </View>
        </View>
    );
};

export default GroupItem;