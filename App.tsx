import { NavigationContainer } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import ErrorBoundary from './src/Components/error-boundary/error-boudary';
import { DatabaseManager } from './src/Database/DatabaseManager';
import LogManager from './src/Helper/LogManager';
import NavigationManager from './src/Helper/NavigationManager';
import { LocalizationManager } from './src/Localization/LocalizationManager';
import Routes from './src/Navigation/Routes';
import { dispatchState, store } from './src/Redux/store';

export default class App extends PureComponent {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        LogManager.debug('app loading', 'test');
        LogBox.ignoreAllLogs();
    }

    render() {
        return (
            <ErrorBoundary>
            <Provider store={store}>
                <NavigationContainer
                    ref={(navigatorRef) => {
                        NavigationManager.setTopLevelNavigator(navigatorRef);
                    }}
                >
                    <Routes />
                </NavigationContainer>
            </Provider>
            </ErrorBoundary>
        );
    }
}
