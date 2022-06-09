import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LogManager from '../../Helper/LogManager';
import { fetchAllDriveItems, fetchItemThumbnail, fetchLastModifiedDate } from './appDataThunk';

const initialState = {
    appDataLoading: false,
};

export const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setAppDataLoading: (state, action: PayloadAction<boolean>) => {
            state.appDataLoading = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllDriveItems.pending, (state) => {
            LogManager.info('api call fetchAllDriveItems pending', 'started');
            state.appDataLoading = true;
        });
        builder.addCase(fetchAllDriveItems.fulfilled, (state, action) => {
            LogManager.info('api call fetchAllDriveItems fulfilled', 'finished');
            state.appDataLoading = false;
        });
        builder.addCase(fetchAllDriveItems.rejected, (state) => {
            LogManager.warn('api call fetchAllDriveItems rejected', 'error');
            state.appDataLoading = false;
        });

        builder.addCase(fetchLastModifiedDate.pending, (state) => {
            LogManager.info('api call fetchLastModifiedDate pending', 'started');
        });
        builder.addCase(fetchLastModifiedDate.fulfilled, (state, action) => {
            LogManager.info('api call fetchLastModifiedDate fulfilled', 'finished');
        });
        builder.addCase(fetchLastModifiedDate.rejected, (state) => {
            LogManager.warn('api call fetchLastModifiedDate rejected', 'error');
        });

        builder.addCase(fetchItemThumbnail.pending, (state) => {
            LogManager.info('api call fetchItemThumbnail pending', 'started');
        });
        builder.addCase(fetchItemThumbnail.fulfilled, (state, action) => {
            LogManager.info('api call fetchItemThumbnail fulfilled', 'finished');
        });
        builder.addCase(fetchItemThumbnail.rejected, (state) => {
            LogManager.warn('api call fetchItemThumbnail rejected', 'error');
        });
    },
});

export const { setAppDataLoading } = appDataSlice.actions;

export default appDataSlice.reducer;
