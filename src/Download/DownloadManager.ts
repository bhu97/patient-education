import { Linking, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { API_NAMES, HTTP_METHODS } from '../Constant/Constants';
import dbHelper from '../Database/DBHelper';
import apiManager from '../Helper/ApiManager';
import deviceManager from '../Helper/DeviceManager';
import { getExtension } from '../Helper/Helper';
import NavigationManager from '../Helper/NavigationManager';
import permissions from '../Helper/Permission';
import { DriveItemModel } from '../Model/DriveItemModel';
import { FavoriteModel } from '../Model/FavouriteModel';

class DownloadManager {
   
    updateCurrentDriveItem = async (item: DriveItemModel, filePath: string ) => {
        let localItem = await dbHelper.getItemDetailByUniqueId(item.uniqueId);
       // console.log("localItem derive item %%%%%%%%%%%%%%%%%%",localItem);
        localItem.downloadLocation = filePath;
        await dbHelper.createDriveItemEnteriesById(localItem, item.uniqueId);
       let localItem1 = await dbHelper.getItemDetailByUniqueId(item.uniqueId);
        console.log("localItem derive item %%%%%%%%%%%%%%%%%%",localItem1.downloadLocation);
    }

   
    updateCurrentFavItem = async (item: FavoriteModel, filePath: string ) => {    
        let localItem = await dbHelper.getFavItemsByUniqueId(item.uniqueId); 
        localItem[0].downloadLocation = filePath;
        await dbHelper.createFavouriteEntries([localItem[0]], item.uniqueId);
        // let localItem1 = await dbHelper.getFavItemsByUniqueId(item.uniqueId); 
        // console.log("localItem1 &&&&&",localItem1);
    }

    downloadFile = async (item: any,isFavPage:boolean, customFileName?: string, ): Promise<string> => {
        const response = await apiManager.callApiToGetData(API_NAMES.THUMBNAIL_LIST_ITEM_DETAILS(item.listItemId));
        const downloadUrl = response.driveItem['@microsoft.graph.downloadUrl'];
        let documentDir = RNFS.DocumentDirectoryPath;
        let _ = await permissions.checkPermission();
      
        let fileName: string;
        if (customFileName) {
            fileName = customFileName ? customFileName : 'PdfFile';
        } else {
            fileName = item.name;
        }
        const fileExt = fileName.split('.').pop();
        var downloadFilePath = documentDir + '/' + fileName;
        if (fileExt === 'pdf' || fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {    
            downloadFilePath = documentDir + '/' + fileName;
        } else { 
            downloadFilePath = downloadUrl;
        }
        let fileDownloadPath = Platform.OS === 'ios' ? documentDir : downloadFilePath;
        const options = {
            fromUrl: downloadUrl,
            toFile: fileDownloadPath,
        };
        return new Promise((resolve, reject) => {
            RNFS.downloadFile(options)
                .promise.then(async (res: any) => {
                    console.log('SUCCESS');
                    if(isFavPage){
                        this.updateCurrentFavItem(item, fileDownloadPath)
                    }else{
                        this.updateCurrentDriveItem(item, fileDownloadPath)
                    }
                    resolve(fileDownloadPath);
                })
                .catch((err) => {
                    // console.log('ERROR', err);
                    reject(err);
                });
        });
    };
    removeFile = async (item: any,isFavPage:boolean) => {
        var path = RNFS.DocumentDirectoryPath + `/${item.name}`;
        return (
            RNFS.unlink(path)
                .then(() => {
                    console.log('FILE DELETED');
                    if(isFavPage){
                        this.updateCurrentFavItem(item, '')
                    }else{
                        this.updateCurrentDriveItem(item, '')
                    }
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch((err) => {
                    console.log(err.message);
                })
        );
    };

    getDownloadedFilesName = async () => {
        let downloadedList: any[] = [];
        const {
            dirs: { DownloadDir, DocumentDir },
        } = RNFetchBlob.fs;
        let isPermitted = await permissions.checkPermission();
        let path: string = '';
        if (deviceManager.isAndroid()) {
            //path = DownloadDir + '/test';
            path = DocumentDir;
        } else {
            path = DocumentDir;
        }
        if (isPermitted) {
            if (path !== '') {
                await RNFS.readDir(path)
                    .then((result: any) => {
                        downloadedList = result;
                    })
                    .catch((err) => {
                        console.log('ERROR::', err);
                    });
            }
        }
        return downloadedList;
    };

    deleteDownloadedFile = async (item) => {
        // create a path you want to delete
        var path = RNFS.DocumentDirectoryPath + `/${item}`;
        return (
            RNFS.unlink(path)
                .then(() => {
                    console.log('FILE DELETED');
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch((err) => {
                    console.log(err.message);
                })
        );
    };

    downloadFileAndShow = async (item): Promise<string> => {
        await this.deleteDownloadedFile(item.name);
        const response = await apiManager.callApiToGetData(API_NAMES.THUMBNAIL_LIST_ITEM_DETAILS(item.listItemId));
        const url = response.driveItem['@microsoft.graph.downloadUrl'];
        const fileName = item.name;
        const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        const options = {
            fromUrl: url,
            toFile: localFile,
        };
        // last step it will download open it with fileviewer.
        return new Promise((resolve, reject) => {
            RNFS.downloadFile(options)
                .promise.then(async (res) => {
                    console.log('localfile 103 =', `file://${localFile}`);
                    // this.openLink(`file://${localFile}`)

                    resolve(`file://${localFile}`);
                })
                .catch(() => {
                    reject('');
                });
        });
    };

    getUrl = async (item): Promise<string> => {
        console.log('item ==', item);

        const response = await apiManager.callApiToGetData(
            API_NAMES.GRAPH_DRIVE_ITEM_ENDPOINT(item.listItemId),
            HTTP_METHODS.GET,
        );
        console.log('response ==', JSON.stringify(response));
        const url = response.driveItem['@microsoft.graph.downloadUrl'];
        const res = await apiManager.callApiToGetData(url, HTTP_METHODS.GET);
        console.log('res ==', res.split('URL=')[1]);

        return new Promise((resolve, reject) => {
            let url = res.split('URL=')[1] ?? '';
            url ? resolve(url) : reject('');
        });
    };

    displayDocument = async (item): Promise<boolean> => {
        const fileExt = getExtension(item.webUrl);
        let title = '';
        if (item.name) title = item.name.split('.' + fileExt)[0];

        return new Promise((resolve, reject) => {
            if (fileExt.toLowerCase() === 'url') {
                downloadManager
                    .getUrl(item)
                    .then((res) => {
                        NavigationManager.navigate('CustomWebView', {
                            url: res,
                            fileName: title ? title : 'QUIZ',
                            isPdf: false,
                        });
                        resolve(true);
                    })
                    .catch(() => {
                        resolve(true);
                    });
            } else if (fileExt.toLowerCase() === 'pdf') {
                downloadManager
                    .downloadFileAndShow(item)
                    .then((res) => {
                        NavigationManager.navigate('CustomWebView', {
                            url: res,
                            fileName: title ? title : 'PDF',
                            isPdf: true,
                        });
                        resolve(true);
                    })
                    .catch(() => {
                        resolve(true);
                    });
            } else {
                Linking.canOpenURL(item.webUrl).then((supported) => {
                    if (supported) {
                        NavigationManager.navigate('CustomWebView', {
                            url: item.webUrl,
                            fileName: title ? title : 'VIDEO',
                            isPdf: false,
                        });
                        resolve(true);
                    } else {
                        console.log(item.webUrl);
                        resolve(true);
                        console.log('error opening url');
                    }
                });
            }
        });
    };
}

//export default AuthenticationManager;
const downloadManager = new DownloadManager();
export default downloadManager;
