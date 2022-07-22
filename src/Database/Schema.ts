import { string } from "prop-types";

export const DriveItemSchema = {
    name: 'DriveItem',
    primaryKey: 'uniqueId',
    properties: {
        uniqueId: 'string',
        webUrl: 'string?',
        name: 'string?',
        serverRelativeUrl: 'string?',
        timeLastModified: 'string?',
        timeCreated: 'string?',
        listItemId: 'string?',
        listId: 'string?',
        siteId: 'string?',
        isDocSet: 'bool?',
        title: 'string?',
        linkedFiles: 'string?',
        linkedFolders: 'string?',
        //file specific
        fileSize: 'int?',
        fileExtension: 'string?',
        timeDownloaded: 'string?',
        downloadLocation: 'string?',
        parentReferenceId: 'string?',
        country: 'string?',
        contentType: 'string?',
        graphDownloadUrl: 'string?',
        documentSetDescription: 'string?',
        nameWithoutPrefix: 'string?',
    },
};

export const UserSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'string',
        uniqueId: 'string',
        countryTitle: 'string',
        countryName: 'string',
        timeLastModified: 'string',
        webUrl: 'string',
        parentReferenceId: 'string',
    },
};

export const FavoriteSchema = {
    name: 'Favorite',
    primaryKey: 'id',
    properties: {
        id: 'string',
        favoriteGroupName: 'string',
        uniqueId: 'string',
        fileExtension: 'string',
        fileSize: 'string',
        largeUrl: 'string',
        listItemId: 'string',
        mediumUrl: 'string',
        name: 'string',
        parentReferenceId: 'string',
        smallUrl: 'string',
        title: 'string',
        webUrl: 'string',
    },
};

export const FavoriteGroupSchema = {
    name: 'FavoriteGroup',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
    },
};

export const LastModifyDateSchema = {
    name: 'LastModifyDate',
    primaryKey: 'id',
    properties: {
        id: 'string',
        lastModifyDate:'string',
        createdDateTime:'string'
    },
};
