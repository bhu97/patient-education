import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LogManager from '../../Helper/LogManager';
import { DriveItemModel } from '../../Model/DriveItemModel';
import { ListItemModel } from '../../Model/ListItemModel';
import { fetchAllListItems, fetchAllDriveItems, fetchItemThumbnail, fetchLastModifiedDate } from './appDataThunk';

const initialState = {
    appDataLoading: false,
    allDriveResponse: [],
    allListResponse: [],
};

export const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        clearData: (state) => {
            state.appDataLoading = false;
            state.allDriveResponse = [];
            state.allListResponse = [];
        },
        setAllDriveResponse: (state, action: PayloadAction<DriveItemModel[]>) => {
            state.allDriveResponse = action.payload;
        },
        setAllListResponse: (state, action: PayloadAction<ListItemModel[]>) => {
            state.allListResponse = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchLastModifiedDate.pending, (state) => {
            LogManager.info('api call fetchLastModifiedDate pending', 'started');
        });
        builder.addCase(fetchLastModifiedDate.fulfilled, (state, action) => {
            LogManager.info('api call fetchLastModifiedDate fulfilled', 'finished');
        });
        builder.addCase(fetchLastModifiedDate.rejected, (state) => {
            LogManager.warn('api call fetchLastModifiedDate rejected', 'error');
        });

        builder.addCase(fetchAllListItems.pending, (state) => {
            LogManager.info('api call fetchAllListItems pending', 'started');
            state.appDataLoading = true;
        });
        builder.addCase(fetchAllListItems.fulfilled, (state, action) => {
            LogManager.info('api call fetchAllListItems fulfilled', 'finished');
            state.appDataLoading = false;
            state.allListResponse = action.payload;
        });
        builder.addCase(fetchAllListItems.rejected, (state) => {
            LogManager.warn('api call fetchAllListItems rejected', 'error');
            state.appDataLoading = false;
            state.allListResponse = [];
        });

        builder.addCase(fetchAllDriveItems.pending, (state) => {
            LogManager.info('api call fetchAllDriveItems pending', 'started');
            state.appDataLoading = true;
        });
        builder.addCase(fetchAllDriveItems.fulfilled, (state, action: PayloadAction<DriveItemModel[]>) => {
            LogManager.info('api call fetchAllDriveItems fulfilled', 'finished');
            state.appDataLoading = false;
            state.allDriveResponse = action.payload;
        });
        builder.addCase(fetchAllDriveItems.rejected, (state) => {
            LogManager.warn('api call fetchAllDriveItems rejected', 'error');
            state.appDataLoading = false;
            state.allDriveResponse = [];
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

export const { clearData, setAllDriveResponse, setAllListResponse } = appDataSlice.actions;

export default appDataSlice.reducer;
