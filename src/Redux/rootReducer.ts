import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import appDataReducer from './app-data/appDataSlice';

// assume that the message slice will be combined with other slices
const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    appDataReducer: appDataReducer,
});

// typescript type for the combined state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
