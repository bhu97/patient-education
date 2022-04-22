import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { object } from 'prop-types';
import category from '../../Json/category';

// interface to declare all required variables
export interface CatagoryState {
   
   catagoryList: any;
}

// to set initial value for all variable
const initialState: CatagoryState = {
   
   catagoryList:category
};

// basic example slice done based on the docs
const catagorySlice = createSlice({
    name: 'catagory',

    initialState,

    reducers: {
        setCatagoryList: (state, action: PayloadAction<string>) => {
            state.catagoryList = action.payload;
        },

       
    },
});

// export individual action creator functions
export const { setCatagoryList} = catagorySlice.actions;

// often the reducer is a default export, but that doesn't matter
export default catagorySlice.reducer;
