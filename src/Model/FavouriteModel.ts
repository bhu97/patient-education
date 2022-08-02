//to declare all required variables
export interface IFavoriteModel {
    id: string;
    favoriteGroupName: string;
    uniqueId: string;
    fileExtension: string;
    fileSize: string;
    largeUrl: string;
    listItemId: string;
    mediumUrl: string;
    name: string;
    parentReferenceId: string;
    smallUrl: string;
    title: string;
    webUrl: string;
    downloadLocation:string;
}

export class FavoriteModel implements IFavoriteModel {
    id: string = '0';
    favoriteGroupName: string;
    uniqueId: string;
    fileExtension: string;
    fileSize: string;
    largeUrl: string;
    listItemId: string;
    mediumUrl: string;
    name: string;
    parentReferenceId: string;
    smallUrl: string;
    title: string;
    webUrl: string;
    downloadLocation:string;


    static generate(response: any) {
        let object: IFavoriteModel = {
            favoriteGroupName: '',
            id: '0',
            uniqueId: '',
            fileExtension: '',
            fileSize: '',
            largeUrl: '',
            listItemId: '',
            mediumUrl: '',
            name: '',
            parentReferenceId: '',
            smallUrl: '',
            title: '',
            webUrl: '',
            downloadLocation:''
        };

        object.id = `${new Date().getTime()}`;
        object.favoriteGroupName = response.favoriteGroupName;
        object.uniqueId = response.uniqueId;
        object.fileExtension = response.fileExtension;
        object.fileSize = response.fileSize;
        object.largeUrl = response.largeUrl;
        object.listItemId = response.listItemId;
        object.mediumUrl = response.mediumUrl;
        object.name = response.name;
        object.parentReferenceId = response.parentReferenceId;
        object.smallUrl = response.smallUrl;
        object.title = response.title;
        object.webUrl = response.webUrl;
        object.downloadLocation = response.downloadLocation

        return object;
    }
}
