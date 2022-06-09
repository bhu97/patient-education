import { API_NAMES } from '../Constant/Constants';

//to declare all required variables
export interface IUserModel {
    id: string;
    uniqueId: string;
    countryTitle: string | undefined;
    countryName: string | undefined;
    timeLastModified: string | undefined;
    webUrl: string | undefined;
    parentReferenceId: string | undefined;
}

export class UserModel implements IUserModel {
    id: string = '0';
    uniqueId: string;
    countryTitle: string;
    countryName: string;
    timeLastModified: string;
    webUrl: string;
    parentReferenceId: string;

    static generate(response: any) {
        let object: IUserModel = {
            uniqueId: '',
            countryTitle: '',
            countryName: '',
            timeLastModified: '',
            webUrl: '',
            parentReferenceId: '',
            id: '0',
        };

        object.id = API_NAMES.USER_ID;
        object.uniqueId = response.uniqueId;
        object.countryTitle = response.title;
        object.countryName = response.name;
        object.timeLastModified = response.timeLastModified;
        object.webUrl = response.webUrl;
        object.parentReferenceId = response.parentReferenceId;
        return object;
    }
}
