import { combineReducers } from '@reduxjs/toolkit';
import postReducer from './posts/postSlice';
import catagoryReducer from './catagory/catagorySlice';

// assume that the message slice will be combined with other slices
const rootReducer = combineReducers({
    postReducer: postReducer,
    catagoryReducer: catagoryReducer
});

// typescript type for the combined state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
