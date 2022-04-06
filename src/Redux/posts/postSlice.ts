import { createSlice } from '@reduxjs/toolkit';
import LogManager from '../../Helper/LogManager';
import { fetchPost } from './postThunk';

const initialState = {
    post: [],
    loading: false,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        clearPosts: (state) => {
            state.post = [];
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            LogManager.info('api call ', 'started');
            state.loading = true;
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            LogManager.info('api call ', 'finished');
            state.post = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPost.rejected, (state) => {
            LogManager.warn('api call ', 'error');
            state.loading = false;
        });
    },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
