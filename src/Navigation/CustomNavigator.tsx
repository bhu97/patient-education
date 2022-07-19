import { createNavigatorFactory, TabActions, TabRouter, useNavigationBuilder } from '@react-navigation/native';
import * as React from 'react';
import { Image, Pressable, StyleSheet, View ,TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NavigationManager from '../Helper/NavigationManager';
import { BaseThemeStyle } from '../Theme/BaseThemeStyle';
import Images from '../Theme/Images';
import { style } from './style';

const ScreenOptions = ({ route, isFocused }) => {
    switch (route) {
        case 'HomeScreen':
            return (
                <View style={[style.tabIconContainer, isFocused ? style.focused : style.unfocused]}>
                    <View style={style.tabIcon}>
                        <Feather
                            name="home"
                            color={isFocused ? BaseThemeStyle.colors.blue : BaseThemeStyle.colors.white}
                            size={35}
                        />
                    </View>
                </View>
            );

        case 'FavouriteScreen':
            return (
                <View style={[style.tabIconContainer, isFocused ? style.focused : style.unfocused]}>
                    <View style={style.tabIcon}>
                        <EvilIcons
                            name="star"
                            color={isFocused ? BaseThemeStyle.colors.blue : BaseThemeStyle.colors.white}
                            size={35}
                        />
                    </View>
                </View>
            );

        case 'SettingScreen':
            return (
                <View style={[style.tabIconContainer, isFocused ? style.focused : style.unfocused]}>
                    <View style={style.tabIcon}>
                        <SimpleLineIcons
                            name="settings"
                            color={isFocused ? BaseThemeStyle.colors.blue : BaseThemeStyle.colors.white}
                            size={35}
                        />
                    </View>
                </View>
            );
    }
};

const onClickSuperLogo = () => {
    NavigationManager.navigateAndClear('HomeScreen')
}

function TabNavigator({ initialRouteName, children, screenOptions }) {
    const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });

    return (
        <NavigationContent>



            <View style={style.tabMainContainer}>

                <View style={style.tabLogo} >
                    <TouchableOpacity onPress={onClickSuperLogo}>
                        <Image
                            resizeMode="contain"
                            style={style.logoSize}
                            source={Images.superSignLogoWhite}
                        />
                    </TouchableOpacity>
                </View>

                <View style={style.iconContainer}>
                    {state.routes.map((route) => (
                        <Pressable
                            key={route.key}
                            onPress={() => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!event.defaultPrevented) {
                                    navigation.dispatch({
                                        ...TabActions.jumpTo(route.name),
                                        target: state.key,
                                    });
                                }
                            }}
                        >
                            <ScreenOptions
                                route={route.name}
                                isFocused={state.routeNames.indexOf(route.name) === state.index}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={style.screenContainer}>
                {state.routes.map((route, i) => {
                    return (
                        <View
                            key={route.key}
                            style={[StyleSheet.absoluteFill, { display: i === state.index ? 'flex' : 'none' }]}
                        >
                            {descriptors[route.key].render()}
                        </View>
                    );
                })}
            </View>
        </NavigationContent>
    );
}

export const createMyNavigator = createNavigatorFactory(TabNavigator);