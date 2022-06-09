import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_NAMES, HTTP_METHODS } from '../../Constant/Constants';
import { DatabaseManager } from '../../Database/DatabaseManager';
import dbHelper from '../../Database/DBHelper';
import { DriveItemSchema } from '../../Database/Schema';
import apiManager from '../../Helper/ApiManager';
import { createDriveModelData, createListModelData } from '../../Helper/Helper';
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
    LogManager.debug('insert DB end 1=');

    // create user into DB
    const userCountry = await dbHelper.createUserIfEmpty();
    LogManager.debug('userCountry=', userCountry);

    const mainCategoryData = await dbHelper.getRootItemsForCountry(userCountry);
    LogManager.debug('mainCategoryData=', mainCategoryData);
    //this.props.setMainList(mainCategoryData);

    // const completeData = driveModelData.map((item, i) => {
    //     if (item.uniqueId === listModelData[i].uniqueId) {
    //         //merging two objects
    //         return Object.assign({}, item, listModelData[i]);
    //     }
    // });
    // LogManager.debug('completeData=', completeData);

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
    LogManager.info('response=', response);

    LogManager.debug('fetchItem call ended');
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
    LogManager.info('response=', response);

    LogManager.debug('fetchItemThumbnail call ended');
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
    LogManager.info('response=', response);

    LogManager.debug('fetchThumbnail call ended');
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
    LogManager.info('response=', response);

    LogManager.debug('fetchAllThumbnails call ended');
    return response['value'];
};

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

    if (response['@odata.nextLink']) {
        const nextData = (await fetchNext(
            response['@odata.nextLink'],
            params,
            data.concat(response['value']),
        )) as Array<any>;
        console.log('nextData: ' + nextData);
        return nextData;
    } else {
        console.log('response.value: ' + response.value);
        return data.concat(response['value']);
    }
};
