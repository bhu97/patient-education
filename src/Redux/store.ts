import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// create the store from the combined reducer
export const store = configureStore({
    reducer: rootReducer,
});

//export store
export default store;

export const getStateOfReducer = (reducerName: string) => {
    const fullState = store.getState() as any;

    return fullState[reducerName];
};

export const dispatchState = (action: any) => {
    store.dispatch(action);
};
