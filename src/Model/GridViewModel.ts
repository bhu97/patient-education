import { getExtension, getFileSizeLiteral } from '../Helper/Helper';

//to declare all required variables
export interface IGridViewModel {
    uniqueId: string;
    parentReferenceId: string;
    title: string;
    fileSize: string;
    fileExtension?: any;
    name: string;
    listItemId: string;
    webUrl: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
    downloadLocation?:string
}
export class GridViewModel {
    uniqueId: string;
    parentReferenceId: string;
    title: string;
    fileSize: string;
    fileExtension: any;
    name: string;
    webUrl: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
    listItemId: string;
    downloadLocation?:string

    static generate(item: any, thumbnails: any) {
        let object: IGridViewModel = {
            uniqueId: '',
            parentReferenceId: '',
            listItemId: '',
            webUrl: '',
            title: '',
            name: '',
            fileSize: '',
            fileExtension: null,
            smallUrl: '',
            mediumUrl: '',
            largeUrl: '',
            downloadLocation:''
        };

        object.uniqueId = item.uniqueId;
        object.listItemId = item.listItemId;
        object.parentReferenceId = item.parentReferenceId;
        object.webUrl = item.webUrl;
        object.title = item.title;
        object.name = item.name;
        object.fileSize = getFileSizeLiteral(item.fileSize);
        object.fileExtension = getExtension(item.name);
        object.smallUrl = thumbnails.smallUrl ? thumbnails.smallUrl : '';
        object.mediumUrl = thumbnails.mediumUrl ? thumbnails.mediumUrl : '';
        object.largeUrl = thumbnails.largeUrl ? thumbnails.largeUrl : '';
        object.downloadLocation = item.downloadLocation;
        return object;
    }
}
