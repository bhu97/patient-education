import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// create the store from the combined reducer
export const store = configureStore({
  reducer: rootReducer
});

//export store
export default store;

