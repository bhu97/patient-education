export interface IThumbnail {
    uniqueId: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
}
export class Thumbnail implements IThumbnail {
    uniqueId: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;

    static generate(response: any) {
        let object: IThumbnail = {
            uniqueId: '0',
            smallUrl: '',
            mediumUrl: '',
            largeUrl: '',
        };

        object.uniqueId = response?.id;
        const thumbnailObject = response?.thumbnails[0];
        object.smallUrl = thumbnailObject?.small?.url ?? '';
        object.mediumUrl = thumbnailObject?.medium?.url ?? '';
        object.largeUrl = thumbnailObject?.large?.url ?? '';
        return object;
    }
}
