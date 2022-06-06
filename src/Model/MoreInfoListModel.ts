//to declare all required variables

export interface IMoreInfoListModel {
    fileSize: string;
    uniqueId: string;
    title: string;
    webUrl: string;
    isFolder: boolean;
}

export class MoreInfoListModel {
    fileSize: string;
    uniqueId: string;
    title: string;
    webUrl: string;
    isFolder: boolean;

    static generate(item: any) {
        let object: IMoreInfoListModel = {
            uniqueId: '0',
            fileSize: '',
            title: '',
            webUrl: '',
            isFolder: false,
        };
        object.uniqueId = item.uniqueId;
        object.title = item.title;
        object.fileSize = item.fileSize;
        object.webUrl = item.webUrl;
        object.isFolder = item.isFolder;
        return object;
    }
}
