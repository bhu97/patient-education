import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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
}

//export default AuthenticationManager;
const downloadManager = new DownloadManager();
export default downloadManager;
