import { API_NAMES } from '../Constant/Constants';

//to declare all required variables
export interface IUser {
    id: string;
    country: string | undefined;
}

export class UserModel implements IUser {
    id: string = '0';
    country: string;

    static generate(country: string) {
        return {
            id: API_NAMES.USER_ID,
            country: country,
        };
    }
}
