import React from 'react';
import FavouriteScreen from '../Screens/FavouriteScreen/FavouritePage';
import SettingScreen from '../Screens/SettingScreen//SettingPage';
import { createMyNavigator } from './CustomNavigator';
import HomeStack from './HomeStack';

const MyNavigator = createMyNavigator();

const CustomNavigator = () => {
    return (
        <MyNavigator.Navigator initialRouteName="List">
            <MyNavigator.Screen name="HomeScreen" component={HomeStack} />
            <MyNavigator.Screen name="FavouriteScreen" component={FavouriteScreen} />
            <MyNavigator.Screen name="SettingScreen" component={SettingScreen} />
        </MyNavigator.Navigator>
    );
};

export default CustomNavigator;