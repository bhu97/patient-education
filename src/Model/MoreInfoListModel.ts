//to declare all required variables

export interface IMoreInfoListModel {
    fileSize: string;
    uniqueId: string;
    title: string;
    webUrl: string;
    isFolder: boolean;
    linkedFolders: string;
    linkedFiles: string;
}

export class MoreInfoListModel {
    fileSize: string;
    uniqueId: string;
    title: string;
    webUrl: string;
    isFolder: boolean;
    linkedFolders: string;
    linkedFiles: string;

    static generate(item: any) {
        let object: IMoreInfoListModel = {
            uniqueId: '0',
            fileSize: '',
            title: '',
            webUrl: '',
            isFolder: false,
            linkedFolders: '',
            linkedFiles: '',
        };
        object.uniqueId = item.uniqueId;
        object.title = item.title;
        object.fileSize = item.fileSize;
        object.webUrl = item.webUrl;
        object.isFolder = item.isFolder;
        object.linkedFolders = item.linkedFolders;
        object.linkedFiles = item.linkedFiles;
        return object;
    }
}
