import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import SplashScreen from 'react-native-splash-screen';
import authenticationManager from '../../Authentication/AuthenticationManager';
import { API_NAMES, HTTP_METHODS, SCREEN_NAME } from '../../Constant/Constants';
import { DatabaseManager } from '../../Database/DatabaseManager';
import dbHelper from '../../Database/DBHelper';
import { DriveItemSchema } from '../../Database/Schema';
import downloadManager from '../../Download/DownloadManager';
import apiManager from '../../Helper/ApiManager';
import { createDriveModelData, createListModelData, isStringEmpty } from '../../Helper/Helper';
import LogManager from '../../Helper/LogManager';
import NavigationManager from '../../Helper/NavigationManager';
import { FavoriteGroupModel } from '../../Model/FavouriteGroupModel';
import { LastModifyDateModel } from '../../Model/LastModifyDateModel';
import { setIsFetchThumbnailLoaded, setIsSupportEmailLoad, setIsUpdateNowEnable, setMainCategoryList, setRefreshDetailScreen, setSupportEmailData } from '../category/categorySlice';
import { dispatchState } from '../store';
import { setAppDataLoading, setIsAlertShown, setIsLogout } from './appDataSlice';

/**
 * createAsyncThunk receives two arguments
 * the first one the action type
 * the second one the payloadCreator callback
 */

//to fetch last modified date
export const fetchLastModifiedDate = createAsyncThunk('appData/fetchLastModifiedDate', async () => {
    // LogManager.debug('fetchLastModifiedDate call started');
    const response = await apiManager.callApiToGetData(API_NAMES.GRAPH_LAST_MODIFIED_DATE, HTTP_METHODS.GET);
    if (response && response.value) {
        let group: LastModifyDateModel = {
            id: response.value[0].id,
            lastModifyDate: response.value[0].lastModifiedDateTime,
            createdDateTime: response.value[0].createdDateTime,
        };
        let storeObjectDate = await dbHelper.getLastDateModify();
        // if (
        //     storeObjectDate.length > 0 &&
        //     storeObjectDate[0].lastModifyDate !== response.value[0].lastModifiedDateTime
        // ) {
        //     dispatchState(setIsUpdateNowEnable(true));
        // }
        // added default as true as country can be added for specific user dynamically 
        dispatchState(setIsUpdateNowEnable(true));
        dbHelper.createLastDateModify(LastModifyDateModel.generate(group));
    }
    // LogManager.info('response= &&&', response.value[0]);
    // LogManager.debug('fetchLastModifiedDate call ended');

    return response;
});

//to fetch meta delta
export const fetchAllDriveItems = createAsyncThunk('appData/fetchDriveItems', async (isRedirectToHomeScreen?: boolean) => {
    LogManager.debug('fetchDriveItems call started');
    dispatchState(setAppDataLoading(true));
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

    //update drive item with list item into db
    LogManager.debug('insert DB stars 2=');
    await DatabaseManager.getInstance().createEntity(DriveItemSchema.name, listModelData);
    LogManager.debug('insert DB end 2=');
    // create user into DB
    const userDetails = await dbHelper.createUserIfEmpty();
    // LogManager.debug('userDetails=', userDetails);

    const mainCategoryData = await dbHelper.getRootItemsForCountry(userDetails);
    // LogManager.debug('mainCategoryData=', mainCategoryData);

    dispatchState(setMainCategoryList(mainCategoryData));

    LogManager.debug('fetchDriveItems call ended');
    /**
     * For first time login navigating to home screen
     * In Case of update now(Setting screen option) redirect to home screen
     */
    if (isRedirectToHomeScreen) {
        replaceAndNavigate(SCREEN_NAME.HomeScreen);
    }
    dispatchState(fetchLastModifiedDate());
    dispatchState(setAppDataLoading(false));
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
    dispatchState(setIsFetchThumbnailLoaded(true));
    LogManager.info('fetchAllThumbnails call ended');
    return (response && response['value']) ?? [];
};

//fetch all data and return 1 response array
export const fetchData = async (url: string, params?: any): Promise<any[]> => {
    if (params === null) {
        params = {};
    }
    let allResponses = Array<any>();
    //LogManager.info('performing request: ', url);
    const responses = await fetchNext(url, params, allResponses);
    //LogManager.debug('all response length: ' + allResponses.length);
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

/**
 * For FirstTime login
 */
export const login = createAsyncThunk('appData/login', async () => {
    const userData: any = await dbHelper.getUser();
    
    //user not present fetch all data and save it DB and set to redux
    if (!userData) {
        dbHelper.createFavGroup(FavoriteGroupModel.generate({ name: 'Default' }));
        authenticationManager.login().then(async (token) => {
            if (token) {
                dispatchState(setIsAlertShown(false));
                dispatchState(fetchAllDriveItems(true));
                await AsyncStorage.setItem('isLogout', 'false');
            } else {
                dispatchState(setIsAlertShown(true));
            }
        });
    } else {
        replaceAndNavigate(SCREEN_NAME.HomeScreen);
    }
});

export const replaceAndNavigate = (screenName: string) => {
    NavigationManager.navigateAndReplace(screenName);
};

export const logout = createAsyncThunk('appData/logout', async () => {
    authenticationManager.setAuthorization(null);
    let obj = await dbHelper.getUser();
    dbHelper.removeUser(obj);
    dispatchState(setIsLogout(true))
    replaceAndNavigate(SCREEN_NAME.LoginScreen);
});

// export const download = createAsyncThunk('appData/downlaod', async (item: any) => {
//     await downloadManager.downloadFile(item,false);
// });
export const downloadFolder = createAsyncThunk('appData/downlaodFolder', async (driveItems: Array<any>) => {
    dispatchState(setAppDataLoading(true))
    for (let i = 0; i < driveItems.length; i++) {
        if (isStringEmpty(driveItems[i].downloadLocation)) {
            await downloadManager.downloadFile(driveItems[i], false);

        } else {
            console.log("already downloaded")
        }
        if (i == driveItems.length - 1) {
            dispatchState(setAppDataLoading(false))
            dispatchState(setRefreshDetailScreen(true))
        }
    }
});

// export const removeDownloadedItem = createAsyncThunk('appData/removeDownloadedItem', async (item: any) => {
//     await downloadManager.removeFile(item,false);
// });
export const removeDownloadedFolder = createAsyncThunk('appData/removeDownloadedFolder', async (driveItems: Array<any>) => {
    dispatchState(setAppDataLoading(true))
    for (let i = 0; i < driveItems.length; i++) {
        if (isStringEmpty(driveItems[i].downloadLocation) == false) {
            await downloadManager.removeFile(driveItems[i], false);
        }
        if (i == driveItems.length - 1) {
            dispatchState(setAppDataLoading(false))
            dispatchState(setRefreshDetailScreen(true))
        }
    }
});

export const fetchEmailSupport = createAsyncThunk('appData/fetchEmailSupport', async (isSupportEmailLoad?: boolean) => {
    
    const params = {};
    if(isSupportEmailLoad == false)
    {
    console.log("called ######");
    const response = await apiManager.callApiToGetData(
        API_NAMES.COUNTRY_SUPPORT_EMAIL,
        HTTP_METHODS.GET,
        params,
    );
    
    LogManager.debug('response= value &&&&&&&', JSON.stringify(response.value));
    if (response.value.length > 0) {
        let emailSupportData: any = []
        for (let item of response.value) {
            const {Title, country, email} = item.fields
            const data = {Title, country, email}
            emailSupportData.push(data)
        }
        dispatchState(setSupportEmailData(emailSupportData))
        dispatchState(setIsSupportEmailLoad(true))
    }
    return response;
}
});



