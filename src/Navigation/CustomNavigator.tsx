import { createNavigatorFactory, TabActions, TabRouter, useNavigationBuilder } from '@react-navigation/native';
import * as React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import images from '../Theme/images';

//screen options at tab bar (side)
const ScreenOptions = ({ route, isFocused }) => {
    switch (route) {
        case 'HomePage':
            return (
                <View
                    style={[
                        { position: 'relative', top: 0, height: 60 },
                        isFocused ? styles.focused : styles.unfocused,
                    ]}
                >
                    <View style={{ left: 38, top: 10 }}>
                        <Feather name="home" color={isFocused ? '#4389bc' : 'white'} size={35} />
                    </View>
                </View>
            );

        case 'FavouritePage':
            return (
                <View
                    style={[
                        { position: 'relative', top: 80, height: 60 },
                        isFocused ? styles.focused : styles.unfocused,
                    ]}
                >
                    <View style={{ left: 38, top: 10 }}>
                        <EvilIcons name="star" color={isFocused ? '#4389bc' : 'white'} size={35} />
                    </View>
                </View>
            );

        case 'SettingPage':
            return (
                <View
                    style={[
                        { position: 'relative', top: 160, height: 60 },
                        isFocused ? styles.focused : styles.unfocused,
                    ]}
                >
                    <View style={{ left: 38, top: 10 }}>
                        <SimpleLineIcons name="settings" color={isFocused ? '#4389bc' : 'white'} size={35} />
                    </View>
                </View>
            );
    }
};

function TabNavigator({
    initialRouteName,
    children,
    screenOptions,
    // tabBarStyle,
    contentStyle,
}) {
    const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });
    // console.log(state);

    return (
        <NavigationContent>
            <View style={{ ...StyleSheet.absoluteFillObject }}>
                <View
                    style={[
                        {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '10.5%',
                            backgroundColor: '#2D9CDB',
                        },
                        // tabBarStyle,
                    ]}
                >
                    <View style={{ position: 'absolute', top: 60, left: 35 }}>
                        <Image
                            resizeMode="contain"
                            style={{ width: 56, height: 45 }}
                            source={images.superSignLogoWhite}
                        />
                    </View>
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
                            <View style={styles.iconContainer}>
                                <ScreenOptions
                                    route={route.name}
                                    isFocused={state.routeNames.indexOf(route.name) === state.index}
                                />
                            </View>
                        </Pressable>
                    ))}
                </View>
                <View
                    style={[
                        {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            width: '89.5%',
                            left: '10.5%',
                            borderWidth: 5,
                            borderColor: 'red',
                        },
                        contentStyle,
                    ]}
                >
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
            </View>
        </NavigationContent>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        top: 219,
        left: 0,
        right: 0,
        height: 230,
    },
    focused: {
        backgroundColor: 'white',
    },
    unfocused: {
        backgroundColor: '#2D9CDB',
    },
});
export const createMyNavigator = createNavigatorFactory(TabNavigator);
