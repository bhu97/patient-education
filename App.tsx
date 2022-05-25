import { NavigationContainer } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import databaseManager from './src/Database/DatabaseManager';
import LogManager from './src/Helper/LogManager';
import NavigationManager from './src/Helper/NavigationManager';
import { LocalizationManager } from './src/Localization/LocalizationManager';
import Routes from './src/Navigation/Routes';
import { store } from './src/Redux/store';

export default class App extends PureComponent {
    constructor(props: any) {
        super(props);

        //initialize localization manager
        LocalizationManager.initializeAppLanguage();

        //initialize database manager
        databaseManager.initializeDatabase();
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
