import { NavigationContainer } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import {LogBox, StatusBar} from 'react-native';
import { LocalizationManager } from './src/Helper/Localization/LocalizationManager';
import LogManager from './src/Helper/LogManager';
import NavigationManager from './src/Helper/NavigationManager';
import Routes from './src/Navigation/Routes';
import { store } from './src/Redux/store';

export default class App extends PureComponent {
    constructor(props: any) {
        super(props);

        //initialize localization manager
        LocalizationManager.initializeAppLanguage();
    }

    componentDidMount() {
        LogManager.debug('app loading', 'test');
        LogBox.ignoreAllLogs();
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationContainer
                    ref={(navigatorRef) => {
                        NavigationManager.setTopLevelNavigator(navigatorRef);
                    }}
                >
                    <Routes />
                </NavigationContainer>
            </Provider>
        );
    }
}
