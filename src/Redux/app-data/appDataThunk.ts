import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_NAMES, HTTP_METHODS } from '../../Constant/Constants';
import apiManager from '../../Helper/ApiManager';
import { createDriveModelData } from '../../Helper/Helper';
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

//to Fetch Drive Items
export const fetchAllDriveItems = createAsyncThunk('appData/fetchDriveItems', async () => {
    LogManager.debug('fetchDriveItems call started');

    const responses = await fetchData(API_NAMES.ALL_DRIVE_ITEM_ENDPOINT);
    LogManager.info('responses=', responses);

    const driveModelData = createDriveModelData(responses);
    LogManager.debug('fetchDriveItems call ended');

    return driveModelData;
});

//to fetch meta delta
export const fetchAllListItems = createAsyncThunk('appData/fetchAdditionalMetadata', async () => {
    LogManager.debug('fetchAdditionalMetadata call started');

    //    const response = await apiManager.callApiToGetData(API_NAMES.ADDITIONAL_META_DATA_ENDPOINT, HTTP_METHODS.GET);
    //    LogManager.info('response=', response);
    const responses = await fetchData(API_NAMES.ALL_LIST_ITEM_ENDPOINT);
    LogManager.info('responses=', responses);

    LogManager.debug('fetchAdditionalMetadata call ended');
    return responses;
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

//fetch all data and return 1 response array
export const fetchData = async (url: string, params?: any): Promise<any[]> => {
    if (params === null) {
        params = {};
    }
    let allResponses = Array<any>();
    console.log('performing request: ' + url);
    const responses = await fetchNext(url, params, allResponses);
    console.log('all response length: ' + allResponses.length);
    return responses;
};

const fetchNext = async (endpoint: string, params: any, data: Array<any>): Promise<any[]> => {
    const response = await apiManager.callApiToGetData(endpoint, params);
    console.log('response nextLink: ' + response['@odata.nextLink']);
    console.log('response value: ' + response['value']);

    // if (response['@odata.nextLink']) {
    //     const nextData = (await fetchNext(
    //         response['@odata.nextLink'],
    //         params,
    //         data.concat(response['value']),
    //     )) as Array<any>;
    //     console.log('nextData: ' + nextData);
    //     return nextData;
    // } else {
    //     console.log('response.value: ' + response.value);
    //     return data.concat(response['value']);
    // }
    return data.concat(response['value']);
};
