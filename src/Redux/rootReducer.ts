import { combineReducers } from '@reduxjs/toolkit';
import catagoryReducer from './catagory/catagorySlice';
import appDataReducer from './app-data/appDataSlice';

// assume that the message slice will be combined with other slices
const rootReducer = combineReducers({
    catagoryReducer: catagoryReducer,
    appDataReducer: appDataReducer,
});

// typescript type for the combined state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
