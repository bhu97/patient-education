import React, { useState } from 'react';
import {
    Text, View
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const GroupItem = (props) => {
    const [isCheck, setCheck] = useState(props.isCheck);
    return (
        <View style={{ flexDirection: 'row',marginBottom:5}}>
            <View>
                <CheckBox
                    tintColors={{ true: '#4389BC', false: '#4389BC'}}
                    disabled={false}
                    value={isCheck}
                    onValueChange={() => {
                        setCheck(!isCheck);
                        props?.onSelect(props.id, !isCheck);
                    }}
                />
            </View>
            <View style={{paddingLeft:8, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize: 18, color: 'black' }}>{props.name}</Text>
            </View>
        </View>
    );
};

export default GroupItem;