export interface IThumbnail {
    uniqueId: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
    lastModifiedDateTime?: string
}
export class Thumbnail implements IThumbnail {
    uniqueId: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
    lastModifiedDateTime: string

    static generate(response: any) {
        let object: IThumbnail = {
            uniqueId: '0',
            smallUrl: '',
            mediumUrl: '',
            largeUrl: '',
            lastModifiedDateTime: ''
        };
        object.uniqueId = response?.id;
        const thumbnailObject = response?.thumbnails[0];
        object.smallUrl = thumbnailObject?.small?.url ?? '';
        object.mediumUrl = thumbnailObject?.medium?.url ?? '';
        object.largeUrl = thumbnailObject?.large?.url ?? '';
        object.lastModifiedDateTime = response?.lastModifiedDateTime;
        return object;
    }
}
