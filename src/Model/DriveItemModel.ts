import { findCountry, getExtension, normalizeUrl } from '../Helper/Helper';

export interface IDriveItem {
    //id?: number;
    uniqueId: string;
    name?: string;
    webUrl?: string;
    serverRelativeUrl?: string;
    timeLastModified?: string;
    timeCreated?: string;
    listItemId?: string;
    listId?: string;
    siteId?: string;
    isDocSet?: boolean;
    title?: string;
    linkedFiles?: string;
    linkedFolders?: string;
    type?: DriveItemType;
    parentReferenceId?: string;
    //file specific
    fileSize?: number;
    fileExtension?: string;
    timeDownloaded?: string;
    downloadLocation?: string;
    country?: string;
    contentType?: string;
    graphDownloadUrl?: string;
    documentSetDescription?: string;
    nameWithoutPrefix?: string;
}

export enum DriveItemType {
    FOLDER,
    FILE,
    DOCUMENTSET,
    UNKNOWN,
}

export class DriveItemModel {
    id?: number;
    uniqueId: string;
    name?: string;
    webUrl?: string;
    serverRelativeUrl?: string;
    timeLastModified?: string;
    timeCreated?: string;
    listItemId?: string;
    listId?: string;
    siteId?: string;
    isDocSet?: boolean;
    title?: string;
    linkedFiles?: string;
    linkedFolders?: string;
    type?: DriveItemType;
    parentReferenceId?: string;
    //file specific
    fileSize?: number;
    fileExtension?: string;
    timeDownloaded?: string;
    downloadLocation?: string;
    country?: string;
    contentType?: string;
    graphDownloadUrl?: string;
    documentSetDescription?: string;
    nameWithoutPrefix?: string;

    static generate(item: any) {
        var createdObject: IDriveItem = {
            uniqueId: '0',
        };
        createdObject.uniqueId = item.id as string;
        createdObject.webUrl = item.webUrl ?? '';
        createdObject.name = item.name ?? '';
        createdObject.serverRelativeUrl = item?.serverRelativeUrl ?? '';
        createdObject.timeLastModified = item?.lastModifiedDateTime ?? '';
        createdObject.timeCreated = item?.timeCreated ?? '';
        createdObject.timeDownloaded = item?.timeDownloaded ?? '';
        createdObject.listItemId = item?.listItemId ?? '';
        createdObject.listId = item?.listId ?? '';
        createdObject.siteId = item?.siteId ?? '';
        createdObject.isDocSet = item?.contentType === 'Document Set';
        createdObject.title = item?.title ?? '';
        createdObject.parentReferenceId = item?.parentReference?.id ?? '';

        createdObject.type = DriveItemType.UNKNOWN;

        createdObject.country = normalizeUrl(createdObject.webUrl);
        createdObject.country = findCountry(createdObject.country) ?? '';
        //file specific
        createdObject.fileSize = item?.size;
        createdObject.nameWithoutPrefix = '';

        if (item.driveItem) {
            createdObject.graphDownloadUrl = item.driveItem['@microsoft.graph.downloadUrl'] ?? '';
        }

        createdObject.fileExtension = getExtension(this.name);
        return createdObject;
    }
}
