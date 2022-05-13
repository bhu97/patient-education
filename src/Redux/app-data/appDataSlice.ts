import { createSlice } from '@reduxjs/toolkit';
import LogManager from '../../Helper/LogManager';
import {
    fetchAdditionalMetadata,
    fetchDelta,
    fetchItem,
    fetchItemThumbnail,
    fetchLastModifiedDate,
} from './appDataThunk';

const initialState = {
    loading: false,
};

export const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        clearData: (state) => {
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLastModifiedDate.pending, (state) => {
            LogManager.info('api call fetchLastModifiedDate pending', 'started');
            state.loading = true;
        });
        builder.addCase(fetchLastModifiedDate.fulfilled, (state, action) => {
            LogManager.info('api call fetchLastModifiedDate fulfilled', 'finished');
            state.loading = false;
        });
        builder.addCase(fetchLastModifiedDate.rejected, (state) => {
            LogManager.warn('api call fetchLastModifiedDate rejected', 'error');
            state.loading = false;
        });

        builder.addCase(fetchAdditionalMetadata.pending, (state) => {
            LogManager.info('api call fetchAdditionalMetadata pending', 'started');
            state.loading = true;
        });
        builder.addCase(fetchAdditionalMetadata.fulfilled, (state, action) => {
            LogManager.info('api call fetchAdditionalMetadata fulfilled', 'finished');
            state.loading = false;
        });
        builder.addCase(fetchAdditionalMetadata.rejected, (state) => {
            LogManager.warn('api call fetchAdditionalMetadata rejected', 'error');
            state.loading = false;
        });

        builder.addCase(fetchDelta.pending, (state) => {
            LogManager.info('api call fetchDelta pending', 'started');
            state.loading = true;
        });
        builder.addCase(fetchDelta.fulfilled, (state, action) => {
            LogManager.info('api call fetchDelta fulfilled', 'finished');
            state.loading = false;
        });
        builder.addCase(fetchDelta.rejected, (state) => {
            LogManager.warn('api call fetchDelta rejected', 'error');
            state.loading = false;
        });

        builder.addCase(fetchItem.pending, (state) => {
            LogManager.info('api call fetchItem pending', 'started');
            state.loading = true;
        });
        builder.addCase(fetchItem.fulfilled, (state, action) => {
            LogManager.info('api call fetchItem fulfilled', 'finished');
            state.loading = false;
        });
        builder.addCase(fetchItem.rejected, (state) => {
            LogManager.warn('api call fetchItem rejected', 'error');
            state.loading = false;
        });

        builder.addCase(fetchItemThumbnail.pending, (state) => {
            LogManager.info('api call fetchItemThumbnail pending', 'started');
            state.loading = true;
        });
        builder.addCase(fetchItemThumbnail.fulfilled, (state, action) => {
            LogManager.info('api call fetchItemThumbnail fulfilled', 'finished');
            state.loading = false;
        });
        builder.addCase(fetchItemThumbnail.rejected, (state) => {
            LogManager.warn('api call fetchItemThumbnail rejected', 'error');
            state.loading = false;
        });
    },
});

export const { clearData } = appDataSlice.actions;

export default appDataSlice.reducer;
