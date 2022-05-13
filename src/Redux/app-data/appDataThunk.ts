import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_NAMES, HTTP_METHODS } from '../../Constant/Constants';
import apiManager from '../../Helper/ApiManager';
import LogManager from '../../Helper/LogManager';

/**
 * createAsyncThunk receives two arguments
 * the first one the action type
 * the second one the payloadCreator callback
 */

//to fetch last modified date
export const fetchLastModifiedDate = createAsyncThunk('appData/fetchLastModifiedDate', async () => {
    LogManager.debug('fetchLastModifiedDate call started');

    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_LAST_MODIFIED_DATE, HTTP_METHODS.GET);
    LogManager.info('response=', response);
    LogManager.debug('fetchLastModifiedDate call ended');

    return response;
});

//to fetch delta
export const fetchDelta = createAsyncThunk('appData/fetchDelta', async () => {
    LogManager.debug('fetchDelta call started');

    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_DELTA_ENDPOINT, HTTP_METHODS.GET);
    LogManager.info('response=', response);

    LogManager.debug('fetchDelta call ended');

    return response;
});

//to fetch meta delta
export const fetchAdditionalMetadata = createAsyncThunk('appData/fetchAdditionalMetadata', async () => {
    LogManager.debug('fetchAdditionalMetadata call started');

    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_DRIVE_ITEMS_ENDPOINT, HTTP_METHODS.GET);
    LogManager.info('response=', response);

    LogManager.debug('fetchAdditionalMetadata call ended');
    return response;
});

//fetchItem
export const fetchItem = createAsyncThunk('appData/fetchItem', async (itemId: string) => {
    LogManager.debug('fetchItem call started itemId=', itemId);

    const params = {
        expand: 'driveItem',
        items: itemId,
    };

    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_DRIVE_ITEM_ENDPOINT, HTTP_METHODS.GET, params);
    LogManager.info('response=', response);

    LogManager.debug('fetchItem call ended');
    return response;
});

//fetch Item Thumbnail
export const fetchItemThumbnail = createAsyncThunk('appData/fetchItemThumbnail', async (itemId: string) => {
    LogManager.debug('fetchItemThumbnail call started itemId=', itemId);

    const params = {
        expand: 'thumbnails',
        uniqueId: itemId,
    };

    const response = await apiManager.callApiToGetData(
        API_NAMES.GRAPH_ITEM_THUMBNAIL_ENDPOINT,
        HTTP_METHODS.GET,
        params,
    );
    LogManager.info('response=', response);

    LogManager.debug('fetchItemThumbnail call ended');
    return response;
});

//fetch Thumbnail
export const fetchThumbnail = createAsyncThunk('appData/fetchThumbnail', async (itemId: string) => {
    LogManager.debug('fetchThumbnail call started itemId=', itemId);

    const params = {
        expand: 'thumbnails',
        uniqueId: itemId,
    };

    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_THUMBNAILS_ENDPOINT, HTTP_METHODS.GET, params);
    LogManager.info('response=', response);

    LogManager.debug('fetchThumbnail call ended');
    return response;
});
