import React from 'react';
import FavouritePage from '../Screens/FavouriteScreen/FavouritePage';
import SettingPage from '../Screens/SettingScreen//SettingPage';
import { createMyNavigator } from './CustomNavigator';
import HomeStack from './HomeStack';

const MyNavigator = createMyNavigator();

const CustomNavigator = () => {
    return (
        <MyNavigator.Navigator initialRouteName="List">
            <MyNavigator.Screen name="HomePage" component={HomeStack} />
            <MyNavigator.Screen name="TestPage" component={FavouritePage} />
            <MyNavigator.Screen name="SettingPage" component={SettingPage} />
        </MyNavigator.Navigator>
    );
};

export default CustomNavigator;