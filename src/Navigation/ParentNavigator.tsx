import React from 'react';
import { createMyNavigator } from './CustomNavigator';

import HomePage from '../Screens/HomeScreen/HomeScreen';
import SettingPage from '../Screens/SettingScreen/SettingPage';
import FavouritePage from '../Screens/FavouriteScreen/FavouritePage';

const MyNavigator = createMyNavigator();

const CustomNavigator = () => {
    return (
        <MyNavigator.Navigator
            initialRouteName="List"
            // screenOptions={tabBarOptions}
        >
            <MyNavigator.Screen name="HomePage" component={HomePage} />
            <MyNavigator.Screen name="FavouritePage" component={FavouritePage} />
            <MyNavigator.Screen name="SettingPage" component={SettingPage} />
        </MyNavigator.Navigator>
    );
};

export default CustomNavigator;
