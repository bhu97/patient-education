import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { API_NAMES } from '../Constant/Constants';
import apiManager from '../Helper/ApiManager';

class DownloadManager {
    downloadFile(downloadUrl: string) {
        console.log('downloadUrl=', downloadUrl);

        let dirs = RNFetchBlob.fs.dirs;
        console.log('dirs=', dirs);

        const {
            dirs: { DownloadDir, DocumentDir, CacheDir, PictureDir, MusicDir },
        } = RNFetchBlob.fs;

        const fileName = downloadUrl.split('/').pop();
        console.log('fileName=', fileName);

        const fileExt = fileName.split('.').pop();
        console.log('fileExt=', fileExt);

        var mimeType = '';

        var downloadFilePath = DownloadDir;

        if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
            mimeType = 'image/*';
            downloadFilePath = PictureDir;
        } else if (fileExt === 'pdf') {
            mimeType = 'application/pdf';
            downloadFilePath = DownloadDir;
        } else if (fileExt === 'avi' || fileExt === 'mp4' || fileExt === 'mov') {
            mimeType = 'video/*';
            downloadFilePath = MusicDir;
        }
        console.log('mimeType=', mimeType);
        console.log('downloadFilePat=', downloadFilePath);

        let fileDownloadPath = Platform.OS === 'ios' ? dirs.DocumentDir : downloadFilePath + '/test/' + fileName;
        console.log('fileDownloadPath=', fileDownloadPath);

        RNFetchBlob.config({
            // response data will be saved to this path if it has access right.
            path: fileDownloadPath,
            //background: true,
            //cacheable:false,
            timeout: 1000 * 60 * 15, //15 minutes
            addAndroidDownloads: {
                path: fileDownloadPath,
                useDownloadManager: true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                // notification: false,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                // mime: 'text/plain',
                //description: 'File downloaded by download manager.',
            },
        })
            .fetch('GET', downloadUrl, {
                //some headers ..
            })
            .then((response) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', response.path());
            })
            .catch((error) => {
                console.log('error=', error);
                // error handling ..
            });
    }

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
            RNFS.downloadFile(options).promise.then(async (res) => {
                console.log("localfile 103 =", `file://${localFile}`);
                // this.openLink(`file://${localFile}`)

                resolve(`file://${localFile}`)
            }).catch(() => {
                reject('')
            });
        });
    };

   

    getFileName = (filePath: string) => {
       return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length).split('.')
    }

}

//export default AuthenticationManager;
const downloadManager = new DownloadManager();
export default downloadManager;
