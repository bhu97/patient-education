import {
    AnyFile,
    DOC,
    DOCX,
    JPEG,
    JPG,
    MP3,
    MP4,
    OGG,
    PDF,
    PNG,
    PPT,
    PPTX,
    TXT,
    XLS,
    XLSX,
    XML,
} from '../../assets/extensions';
import { DriveItemModel, IDriveItem } from '../Model/DriveItemModel';
import { GridViewModel } from '../Model/GridViewModel';
import { ListItemModel } from '../Model/ListItemModel';
import { Thumbnail } from '../Model/Thumbnail';
import LogManager from './LogManager';

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

// get response data and map it to list model structure
export const createGridModelData = async (responseData: any, thumbnailResponse: any) => {
    let gridModelData: GridViewModel[];

    const ThumbnailData = thumbnailResponse.map((thumbnailObj: any) => {
        return Thumbnail.generate(thumbnailObj);
    });

    gridModelData = responseData.map((responseObject: any) => {
        const thumbnailObj = ThumbnailData.find((x: any) => x.uniqueId === responseObject.uniqueId);

        return GridViewModel.generate(responseObject, thumbnailObj);
    });

    return gridModelData;
};

export const base64ToArrayBuffer = (binaryString: string) => {
    let len = binaryString.length;

    let bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
};

export const applyDriveItemFilter = (driveItems: IDriveItem[]): IDriveItem[] => {
    //RULE : filter out all files that start with a dot e.g. .flex
    driveItems = filterVersionFiles(driveItems);
    //LogManager.debug('rootItemData flex/light filter =', driveItems);

    //RULE : filter out all files that start with a dot e.g.  any whitelist.txt
    driveItems = filterWhitelistFiles(driveItems);
    //LogManager.debug('rootItemData whitelist filter =', driveItems);

    //RULE: filter out any folder that is named Linked Files
    driveItems = filterLinkedFilesFolder(driveItems);
    //LogManager.debug('rootItemData Linked filter=', driveItems);

    // driveItems = createDriveModelData(driveItems);
    //LogManager.debug('rootItemData createDriveModelData=', driveItems);

    return driveItems;
};

const filterVersionFiles = (driveItems: IDriveItem[]): IDriveItem[] => {
    return driveItems
        .filter((driveItem) => driveItem.name !== '.light')
        .filter((driveItem) => driveItem.name !== '.flex');
};

const filterWhitelistFiles = (driveItems: IDriveItem[]): IDriveItem[] => {
    return driveItems.filter((driveItem) => driveItem.name !== 'whitelist.txt');
};

const filterLinkedFilesFolder = (driveItems: IDriveItem[]): IDriveItem[] => {
    return driveItems.filter((driveItem) => driveItem.name !== 'Linked Files');
};

export function getIconByExtension(fileName?: string) {
    const extension = getExtension(fileName);
    switch (extension?.toUpperCase()) {
        default:
            return AnyFile;
        case 'DOC':
            return DOC;
        case 'DOCX':
            return DOCX;
        case 'JPEG':
            return JPEG;
        case 'JPG':
            return JPG;
        case 'MP3':
            return MP3;
        case 'MP4':
            return MP4;
        case 'OGG':
            return OGG;
        case 'PDF':
            return PDF;
        case 'PNG':
            return PNG;
        case 'PPT':
            return PPT;
        case 'PPTX':
            return PPTX;
        case 'TXT':
            return TXT;
        case 'XLS':
            return XLS;
        case 'XLSX':
            return XLSX;
        case 'XML':
            return XML;
    }
}

export function getFileSizeLiteral(fileSize: number) {
    if (fileSize < 1024) {
        return `${fileSize}\u00A0B`;
    }
    const kilo = Math.floor(fileSize / 10.24) / 100;
    if (kilo < 1024) {
        return `${kilo}\u00A0KB`;
    }
    const mega = Math.floor(kilo / 10.24) / 100;
    if (mega < 1024) {
        return `${mega}\u00A0MB`;
    }
    const giga = Math.floor(mega / 10.24) / 100;
    return `${giga}\u00A0GB`;
}

//get linked item list in array
export function linkedUrlListToArray(urlListText: string): string[] {
    return urlListText.split(',').map((url) => url.trim());
}

export function createBredCrumbList(selectedCategoryData: any): [] {
    let breadCrumbList: any = [
        {
            id: 0,
            title: 'Home',
            isFirstCrumb: true,
        },
    ];
    selectedCategoryData.forEach((selectedCategoryDataObj, index) => {
        var obj = {
            id: selectedCategoryDataObj.prvIndex + 1,
            title: selectedCategoryDataObj.label ? selectedCategoryDataObj.label : '',
            isFirstCrumb: false,
            prvIndex: selectedCategoryDataObj.prvIndex,
        };
        breadCrumbList.push(obj);
    });
    return breadCrumbList;
}
