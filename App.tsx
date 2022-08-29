import { NavigationContainer } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import ErrorBoundary from './src/Components/error-boundary/error-boudary';
import LogManager from './src/Helper/LogManager';
import NavigationManager from './src/Helper/NavigationManager';
import Routes from './src/Navigation/Routes';
import store, { dispatchState, getStateOfReducer } from './src/Redux/store';
import { PersistGate } from "redux-persist/integration/react";
import CustomToast from './src/Components/custom-toast/custom-toast';



let Persistor = persistStore(store)

export default class App extends PureComponent {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        LogManager.debug('app loading', 'test');
        LogBox.ignoreAllLogs();
        //persistentReducer
        console.log(getStateOfReducer('persistentReducer'));
        
    }

    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={Persistor}>
                        <NavigationContainer
                            ref={(navigatorRef) => {
                                NavigationManager.setTopLevelNavigator(navigatorRef);
                            }}
                        >
                            <Routes />

                        </NavigationContainer>
                        <CustomToast  />
                        </PersistGate>
                </Provider>
            </ErrorBoundary>
        );
    }
}
