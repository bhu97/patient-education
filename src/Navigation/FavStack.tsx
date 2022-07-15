import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CustomWebView from '../Components/webview/custom-web-view';
import FavouriteScreen from '../Screens/FavouriteScreen/FavouritePage';
import { BaseThemeStyle } from '../Theme/BaseThemeStyle';

const Stack = createStackNavigator();

function FavouriteStack() {
    return (
        <Stack.Navigator
            initialRouteName="FavouriteScreen"
            screenOptions={{
                gestureEnabled: false,
                header: undefined,
                headerShown: false,
                cardStyle: { backgroundColor: BaseThemeStyle.colors.screenBackgroundColor },
            }}
        >
            <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
            <Stack.Screen name="CustomWebView" component={CustomWebView} />
        </Stack.Navigator>
    );
}

export default FavouriteStack;
