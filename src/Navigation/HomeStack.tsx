import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomePage from '../Screens/HomeScreen/HomeScreen';


const Stack = createStackNavigator();

function HomeStack() {

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                gestureEnabled: false,
                header: undefined,
                headerShown: false,
                cardStyle: { backgroundColor: '#F2F3F5' },
            }}
        >
            <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>

    );

}


export default HomeStack;