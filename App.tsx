import { NavigationContainer } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { Alert, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { DatabaseManager } from './src/Database/DatabaseManager';
import { envConfiguration } from './src/Helper/EnvConfigurations';
import LogManager from './src/Helper/LogManager';
import NavigationManager from './src/Helper/NavigationManager';
import { LocalizationManager } from './src/Localization/LocalizationManager';
import Routes from './src/Navigation/Routes';
import { fetchAllDriveItems, fetchAllListItems } from './src/Redux/app-data/appDataThunk';
import { dispatchState, store } from './src/Redux/store';

export default class App extends PureComponent {
    constructor(props: any) {
        super(props);
        LogManager.debug('app language setup starts=');
        //initialize localization manager
        LocalizationManager.initializeAppLanguage();
        LogManager.debug('app language setup ends=');
    }

    componentDidMount() {
        LogManager.debug('app loading', 'test');
        LogBox.ignoreAllLogs();
        envConfiguration.envName
        Alert.alert(`${envConfiguration.envName}`)
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
