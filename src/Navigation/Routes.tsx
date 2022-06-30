import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SCREEN_NAME } from '../Constant/Constants';
import LoginScreen from '../Screens/AuthScreen/LoginScreen';
import CustomNavigator from './ParentNavigator';

const Stack = createStackNavigator();

function Routes() {
    return (
        <Stack.Navigator
            initialRouteName={SCREEN_NAME.LoginScreen}
            screenOptions={{
                gestureEnabled: false,
                header: undefined,
                headerShown: false,
                cardStyle: { backgroundColor: '#F2F3F5' },
            }}
        >
            <Stack.Screen name={SCREEN_NAME.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={SCREEN_NAME.HomeScreen} component={CustomNavigator} />
        </Stack.Navigator>
    );
}

export default Routes;
