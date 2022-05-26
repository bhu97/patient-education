import { DriveItemType } from './DriveItemModel';

export interface IListItem {
    uniqueId: string;
    contentType?: string;
    title?: string;
    documentSetDescription?: string;
    linkedFolders?: string;
    linkedFiles?: string;
    listItemId?: string;
    type?: DriveItemType;
    isDocSet?: boolean;
}

export class ListItemModel implements IListItem {
    uniqueId: string = '0';
    contentType?: string;
    title?: string;
    documentSetDescription?: string;
    listItemId?: string;
    linkedFolders?: string;
    linkedFiles?: string;
    type?: DriveItemType;
    isDocSet?: boolean;

    static generate(item: any) {
        let object: IListItem = {
            uniqueId: '0',
        };
        //console.log(JSON.stringify(item))
        let docType = item.contentType.name === 'Folder' ? DriveItemType.FOLDER : DriveItemType.FILE;
        docType = item.contentType.name === 'Document Set' ? DriveItemType.DOCUMENTSET : docType;

        object.uniqueId = item.driveItem.id;
        object.contentType = item.contentType.name;
        object.title = item.fields.Title ?? '';
        object.documentSetDescription = item.fields.DocumentSetDescription ?? '';
        object.linkedFiles = item.fields.Linked_x0020_files ?? '';
        object.linkedFolders = item.fields.Linked_x0020_folders ?? '';
        object.type = docType;
        object.isDocSet = docType === DriveItemType.DOCUMENTSET;

        object.listItemId = item.id;
        return object;
    }
}
