import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface to declare all required variables
export interface MessageState {
    value: number;
    messageText: string;
}

// to set initial value for all variable
const initialState: MessageState = {
    value: 0,
    messageText: 'welcome to Redux toolkit',
};

// basic example slice done based on the docs
const messageSlice = createSlice({
    name: 'message',

    initialState,

    reducers: {
        setMessageText: (state, action: PayloadAction<string>) => {
            state.messageText = action.payload;
        },

        incrementValue: (state) => {
            state.value += 1;
        },

        decrementValue: (state) => {
            state.value -= 1;
        },
    },
});

// export individual action creator functions
export const { setMessageText, incrementValue, decrementValue } = messageSlice.actions;

// often the reducer is a default export, but that doesn't matter
export default messageSlice.reducer;
