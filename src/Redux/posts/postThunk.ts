import { createAsyncThunk } from '@reduxjs/toolkit';
import LogManager from '../../Helper/LogManager';

/**
 * createAsyncThunk receives two arguments
 * the first one the action type
 * the second one the payloadCreator callback
 */
export const fetchPost = createAsyncThunk('posts/fetchPost', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/post');
    LogManager.debug('response', response.json());
    return await response.json();
});
