import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_NAMES, HTTP_METHODS } from '../../Constant/Constants';
import { DatabaseManager } from '../../Database/DatabaseManager';
import dbHelper from '../../Database/DBHelper';
import { DriveItemSchema } from '../../Database/Schema';
import apiManager from '../../Helper/ApiManager';
import { createDriveModelData, createListModelData } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import { setMainCategoryList } from '../category/categorySlice';
import { dispatchState } from '../store';

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

//to fetch meta delta
export const fetchAllDriveItems = createAsyncThunk('appData/fetchDriveItems', async () => {
    LogManager.debug('fetchDriveItems call started');

    const driveItems = await fetchData(API_NAMES.ALL_DRIVE_ITEM_ENDPOINT);
    LogManager.info('responses driveItems=', driveItems);

    const driveModelData = createDriveModelData(driveItems);
    LogManager.info('driveModelData=', driveModelData);

    //add drive item to db
    LogManager.debug('insert DB stars 1=');
    await DatabaseManager.getInstance().createEntity(DriveItemSchema.name, driveModelData);
    LogManager.debug('insert DB end 1=');

    const listItems = await fetchData(API_NAMES.ALL_LIST_ITEM_ENDPOINT);
    LogManager.info('responses list Item=', listItems);

    const listModelData = createListModelData(listItems);
    LogManager.debug('listModelData=', listModelData);

    LogManager.debug('insert DB stars 2=');
    await DatabaseManager.getInstance().createEntity(DriveItemSchema.name, listModelData);
    LogManager.debug('insert DB end 2=');

    // create user into DB
    const userDetails = await dbHelper.createUserIfEmpty();
    LogManager.debug('userDetails=', userDetails);

    const mainCategoryData = await dbHelper.getRootItemsForCountry(userDetails);
    LogManager.debug('mainCategoryData=', mainCategoryData);

    dispatchState(setMainCategoryList(mainCategoryData));

    LogManager.debug('fetchDriveItems call ended');

    return mainCategoryData;
});

//fetchItem
export const fetchItem = createAsyncThunk('appData/fetchItem', async (itemId: string) => {
    LogManager.debug('fetchItem call started itemId=', itemId);

    const params = {
        expand: 'driveItem',
        items: itemId,
    };

    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_DRIVE_ITEM_ENDPOINT, HTTP_METHODS.GET, params);
    LogManager.debug('response=', response);

    LogManager.info('fetchItem call ended');
    return response;
});

//fetch Item Thumbnail
export const fetchItemThumbnail = createAsyncThunk('appData/fetchItemThumbnail', async (itemId: string) => {
    LogManager.debug('fetchItemThumbnail call started itemId=', itemId);

    const params = {};

    const response = await apiManager.callApiToGetData(
        API_NAMES.GRAPH_ITEM_THUMBNAIL_ENDPOINT(itemId),
        HTTP_METHODS.GET,
        params,
    );
    LogManager.debug('response=', response);

    LogManager.info('fetchItemThumbnail call ended');
    return response;
});

//fetch Thumbnail
export const fetchThumbnail = createAsyncThunk('appData/fetchThumbnail', async (uniqueId: string) => {
    LogManager.debug('fetchThumbnail call started uniqueId=', uniqueId);

    const params = {};

    const response = await apiManager.callApiToGetData(
        API_NAMES.GRAPH_THUMBNAILS_ENDPOINT(uniqueId),
        HTTP_METHODS.GET,
        params,
    );
    LogManager.debug('response=', response);

    LogManager.info('fetchThumbnail call ended');
    return response;
});

//fetch all data and return 1 response array
export const fetchAllThumbnails = async (uniqueId: string): Promise<any[]> => {
    LogManager.debug('fetchAllThumbnails call started uniqueId=', uniqueId);

    const response = await apiManager.callApiToGetData(
        API_NAMES.GRAPH_THUMBNAILS_ENDPOINT(uniqueId),
        HTTP_METHODS.GET,
        {},
    );
    LogManager.debug('response=', response);

    LogManager.info('fetchAllThumbnails call ended');
    return response['value'];
};

//fetch all data and return 1 response array
export const fetchData = async (url: string, params?: any): Promise<any[]> => {
    if (params === null) {
        params = {};
    }
    let allResponses = Array<any>();
    LogManager.info('performing request: ', url);
    const responses = await fetchNext(url, params, allResponses);
    LogManager.debug('all response length: ' + allResponses.length);
    return responses;
};

const fetchNext = async (endpoint: string, params: any, data: Array<any>): Promise<any[]> => {
    const response = await apiManager.callApiToGetData(endpoint, params);

    if (response['@odata.nextLink']) {
        const nextData = (await fetchNext(
            response['@odata.nextLink'],
            params,
            data.concat(response['value']),
        )) as Array<any>;
        return nextData;
    } else {
        return data.concat(response['value']);
    }
};
