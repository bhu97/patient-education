import React from 'react';
import { Button, View } from 'react-native';

const Test = (props) => {
    return (
        <View>
            <Button onPress={() => props.navigation.navigate('NetworkManager')} title="Go to NetworkManager" />
        </View>
    );
};

export default Test;
