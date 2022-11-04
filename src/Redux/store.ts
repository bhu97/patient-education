import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PAUSE,
  PERSIST,
  persistReducer,
  REHYDRATE,
  FLUSH,
  PURGE,
  REGISTER,
   persistStore
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist:['persistentReducer'],
    blacklist:['appDataReducer','categoryReducer']
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
   const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }),
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;


export default store;


export const getStateOfReducer = (reducerName: string) => {
    const fullState = store.getState() as any;
    return fullState[reducerName];
};

export const dispatchState = (action: any) => {
    store.dispatch(action);
};

export const getStateValue = (reducerName: string,variable:string) => {
  const fullState = store.getState() as any;
  let reducerData = fullState[reducerName];
  return reducerData[variable];
};