//to declare all required variables
export class MoreInfoListModel {
    fileName: string;
    iconName: string;
    fileSize: string;

    constructor(moreInfoResponse?: MoreInfoListModel) {
        Object.assign(this, moreInfoResponse);
    }
}
