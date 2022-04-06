import { combineReducers } from '@reduxjs/toolkit';
import messageReducer from './message/messageSlice';
import postReducer from './posts/postSlice';

// assume that the message slice will be combined with other slices
const rootReducer = combineReducers({
    messageReducer: messageReducer,
    postReducer: postReducer,
});

// typescript type for the combined state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
