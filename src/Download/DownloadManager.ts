import { Linking, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { API_NAMES, HTTP_METHODS } from '../Constant/Constants';
import apiManager from '../Helper/ApiManager';
import deviceManager from '../Helper/DeviceManager';
import { getExtension } from '../Helper/Helper';
import NavigationManager from '../Helper/NavigationManager';
import permissions from '../Helper/Permission';

class DownloadManager {
    // downloadFile(downloadUrl: string) {
    //     console.log('downloadUrl=', downloadUrl);

    //     let dirs = RNFetchBlob.fs.dirs;
    //     console.log('dirs=', dirs);

    //     const {
    //         dirs: { DownloadDir, DocumentDir, CacheDir, PictureDir, MusicDir },
    //     } = RNFetchBlob.fs;

    //     const fileName = downloadUrl.split('/').pop();
    //     console.log('fileName=', fileName);

    //     const fileExt = fileName.split('.').pop();
    //     console.log('fileExt=', fileExt);

    //     var mimeType = '';

    //     var downloadFilePath = DownloadDir;

    //     if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
    //         mimeType = 'image/*';
    //         downloadFilePath = PictureDir;
    //     } else if (fileExt === 'pdf') {
    //         mimeType = 'application/pdf';
    //         downloadFilePath = DownloadDir;
    //     } else if (fileExt === 'avi' || fileExt === 'mp4' || fileExt === 'mov') {
    //         mimeType = 'video/*';
    //         downloadFilePath = MusicDir;
    //     }
    //     console.log('mimeType=', mimeType);
    //     console.log('downloadFilePat=', downloadFilePath);

    //     let fileDownloadPath = Platform.OS === 'ios' ? dirs.DocumentDir : downloadFilePath + '/test/' + fileName;
    //     console.log('fileDownloadPath=', fileDownloadPath);

    //     RNFetchBlob.config({
    //         // response data will be saved to this path if it has access right.
    //         path: fileDownloadPath,
    //         //background: true,
    //         //cacheable:false,
    //         timeout: 1000 * 60 * 15, //15 minutes
    //         addAndroidDownloads: {
    //             path: fileDownloadPath,
    //             useDownloadManager: true, // <-- this is the only thing required
    //             // Optional, override notification setting (default to true)
    //             // notification: false,
    //             // Optional, but recommended since android DownloadManager will fail when
    //             // the url does not contains a file extension, by default the mime type will be text/plain
    //             // mime: 'text/plain',
    //             //description: 'File downloaded by download manager.',
    //         },
    //     })
    //         .fetch('GET', downloadUrl, {
    //             //some headers ..
    //         })
    //         .then((response) => {
    //             // the path should be dirs.DocumentDir + 'path-to-file.anything'
    //             console.log('The file saved to ', response.path());
    //         })
    //         .catch((error) => {
    //             console.log('error=', error);
    //             // error handling ..
    //         });
    // }

    downloadFile = async (downloadUrl: string, customFileName?: string): Promise<string> => {
        let documentDir = RNFS.DocumentDirectoryPath;
        let isPermitted = await permissions.checkPermission();
        let isPdf = false;
        console.log('ISPERMITTED', isPermitted);
        let fileName: string;
        if (customFileName) {
            fileName = customFileName ? customFileName : 'PdfFile';
        } else {
            fileName = downloadUrl.split('/').pop();
        }
        const fileExt = fileName.split('.').pop();
        var downloadFilePath = documentDir + '/' + fileName;
        if (fileExt === 'pdf' || fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
            isPdf = true
            downloadFilePath = documentDir + '/' + fileName;
        } else {
            isPdf = false
            downloadFilePath = downloadUrl;
        }
        let fileDownloadPath =
            Platform.OS === 'ios' ? documentDir : downloadFilePath;

        console.log('fileDownloadPath=', fileDownloadPath);
        const options = {
            fromUrl: downloadUrl,
            toFile: fileDownloadPath,
        };
        return new Promise((resolve, reject) => {
            RNFS.downloadFile(options).promise.then((res: any) => {
                console.log('SUCCESS');
                resolve(fileDownloadPath)
            }).catch((err) => {
                console.log('ERROR', err);
                reject(err)
            });
        })

    }




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
