import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoryDetailScreen from '../Screens/CategoryDetailScreen/CategoryDetailScreen';
import CategoryScreen from '../Screens/CategoryScreen/CategoryScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import SubCategoryScreen from '../Screens/SubCategoryScreen/SubCategoryScreen';
import { BaseThemeStyle } from '../Theme/BaseThemeStyle';
import CustomWebView from '../Components/webview/custom-web-view'

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                gestureEnabled: false,
                header: undefined,
                headerShown: false,
                cardStyle: { backgroundColor: BaseThemeStyle.colors.screenBackgroundColor },
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
            <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />
            <Stack.Screen name="CustomWebView" component={CustomWebView} />
        </Stack.Navigator>
    );
}

export default HomeStack;
