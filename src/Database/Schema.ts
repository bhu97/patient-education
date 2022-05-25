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
        country: 'string?',
    },
};

export const FavoriteSchema = {
    name: 'Favorite',
    primaryKey: 'id',
    properties: {
        id: 'string',
        favoriteGroupName: 'string',
        uniqueId: 'string',
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
