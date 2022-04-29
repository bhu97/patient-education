import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CustomNavigator from './ParentNavigator';

const Stack = createStackNavigator();

function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                gestureEnabled: false,
                header: undefined,
                headerShown: false,
                cardStyle: { backgroundColor: 'white' },
            }}
        >
            <Stack.Screen name="HomeScreen" component={CustomNavigator} />
        </Stack.Navigator>
    );
}

export default Routes;
