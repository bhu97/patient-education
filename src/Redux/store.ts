import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'


// create the store from the combined reducer
// export const store = configureStore({
//     reducer: rootReducer,
// });

const persistConfig = {
    key:'root',
    storage:AsyncStorage,
    whitelist:['persistent']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    devTools: process.env.NODE_ENV != 'production',
    middleware:[thunk]
})

//export store
export default store;


export const getStateOfReducer = (reducerName: string) => {
    const fullState = store.getState() as any;

    return fullState[reducerName];
};

export const dispatchState = (action: any) => {
    store.dispatch(action);
};
