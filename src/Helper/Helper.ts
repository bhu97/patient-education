import { List } from 'realm';
import { DriveItemModel, IDriveItem } from '../Model/DriveItemModel';
import { ListItemModel } from '../Model/ListItemModel';

export const normalizeUrl = (url: string | undefined): string => {
    if (url) {
        const components = url.split('Shared%20Documents');
        if (components.length > 0) {
            return components[1];
        }
        return url;
    }
    return '';
};

export const getExtension = (fileName: string): string => {
    var re = /(?:\.([^.]+))?$/;
    let extension = re.exec(fileName)?.[1];
    return extension ?? '';
};

export const findCountry = (string: string): string | undefined => {
    let result = string?.split('/');
    if (result && result.length > 1) {
        if (result[0] === '/' || result[0] === '') {
            const countryCode = result[1];
            return countryCode;
        }
        const countryCode = result[0];
        return countryCode;
    }
    return undefined;
};

export const notEmpty = <T>(value: T): value is NonNullable<typeof value> => !!value;

export const nameWithoutPrefix = (name: string): string => {
    let regex = RegExp('^\\d{3}\\s?');
    return name.replace(regex, '');
};

export const cutBaseUrl = (item: string) => {
    return item.replace('https://fresenius.sharepoint.com/', '');
};

export const cutParams = (item: string): string => {
    return item.replace(new RegExp('\\?\\w.*'), '');
};

export const cutDriveInfo = (item: string): string => {
    return item.replace(new RegExp(':\\w:\\/\\w'), '');
};

export const sanitizeWebUrl = (url: string): string | undefined => {
    let noBaseUrl = cutBaseUrl(url);
    let noParams = cutParams(noBaseUrl);
    let noDriveInfo = cutDriveInfo(noParams);
    let noWhitespace = noDriveInfo.trim();
    const sanitizedWebUrl = noWhitespace;
    return sanitizedWebUrl;
};

// get response data and map it to drive model structure
export const createDriveModelData = (responseData: any) => {
    let driveModelData: DriveItemModel[];

    driveModelData = responseData.map((responseObject) => {
        return DriveItemModel.generate(responseObject);
    });

    return driveModelData;
};

// get response data and map it to list model structure
export const createListModelData = (responseData: any) => {
    let listModelData: ListItemModel[];

    listModelData = responseData.map((responseObject) => {
        return ListItemModel.generate(responseObject);
    });

    return listModelData;
};

export const base64ToArrayBuffer = (binaryString: string) => {
    let len = binaryString.length;

    let bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
};

export const filterVersionFiles = (driveItems: IDriveItem[]): IDriveItem[] => {
    return driveItems
        .filter((driveItem) => driveItem.name !== '.light')
        .filter((driveItem) => driveItem.name !== '.flex');
};

export const filterWhitelistFiles = (driveItems: IDriveItem[]): IDriveItem[] => {
    return driveItems.filter((driveItem) => driveItem.name !== 'whitelist.txt');
};

export const filterLinkedFilesFolder = (driveItems: IDriveItem[]): IDriveItem[] => {
    return driveItems.filter((driveItem) => driveItem.name !== 'Linked Files');
};
