import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {
    AuthConfiguration,
    authorize,
    AuthorizeResult,
    BuiltInParameters,
    refresh,
    ServiceConfiguration,
} from 'react-native-app-auth';
import { API_NAMES } from '../Constant/Constants';
import { envConfiguration } from '../Helper/EnvConfigurations';

const serviceConfiguration: ServiceConfiguration = {
    authorizationEndpoint: API_NAMES.AUTHORIZATION_ENDPOINT,
    tokenEndpoint: API_NAMES.TOKEN_ENDPOINT,
};

const additionalParameters: BuiltInParameters & { [name: string]: string } = {
    prompt: 'select_account',
};

const authConfig: AuthConfiguration = {
    clientId: envConfiguration.clientId,
    redirectUrl: API_NAMES.REDIRECT_URI,
    scopes: API_NAMES.GRAPH_SCOPES,
    serviceConfiguration: serviceConfiguration,
    additionalParameters: additionalParameters,
};

const storageKey = 'authorization';

const refreshConfig = {
    value: 5,
    unit: 'minute',
};

export class AuthenticationManager {
    /**
     * @returns user token
     */
    static getToken = async () => {
        console.log('getToken called =');
        try {
            console.log(authConfig);
            const result = await authorize(authConfig);
            return result;
        } catch (error) {
            console.error('error 2=', JSON.stringify(error));
        }
    };

    /**
     * @returns user token
     */
    static login = async (): Promise<AuthorizeResult | undefined> => {
        console.log('login called =');
        try {
            console.log(authConfig);
            const result = await authorize(authConfig);
            console.log('result=', result);
            this.setAuthorization(result);
            return result;
        } catch (error) {
            console.error('error 1=', error);
        }
        return undefined;
    };

    /**
     * @returns authResult
     */
    static refreshToken = async (authResult: AuthorizeResult): Promise<AuthorizeResult> => {
        console.log('refreshToken called =');

        const refreshResult = await refresh(authConfig, {
            refreshToken: authResult.refreshToken || '',
        });
        console.log('refreshResult =', refreshResult);
        authResult.accessToken = refreshResult.accessToken;

        authResult.refreshToken = refreshResult.refreshToken || '';
        authResult.accessTokenExpirationDate = refreshResult.accessTokenExpirationDate;

        console.info('Azure AD - Refreshed access token with: ', refreshResult);

        this.setAuthorization(authResult);
        return authResult;
    };

    static getAccessToken = async (): Promise<string | undefined> => {
        console.log('getAccessToken called =');
        let authorization = await this.getAuthorization();
        console.log('auth=', authorization);
        if (authorization) {
            console.log('if 1', authorization);
            if (this.isAuthorizationExpired(authorization)) {
                authorization = await this.refreshToken(authorization);
            }
            console.info('Azure AD - Answering request for access token with: ' + authorization.accessToken);
            return authorization.accessToken;
        } else {
            console.log('else');
            authorization = await this.login();
        }

        return undefined;
    };

    static getAuthorization = async () => {
        console.log('getAuthorization called..');
        const raw = await AsyncStorage.getItem(storageKey);
        console.log('raw =', JSON.parse(raw));
        if (raw) {
            return JSON.parse(raw);
        }
        return undefined;
    };

    static setAuthorization = async (authorizationResult: AuthorizeResult) => {
        console.log('setAuthorization called =');
        const raw = JSON.stringify(authorizationResult);
        console.log('raw=', raw);
        await AsyncStorage.setItem(storageKey, raw);
    };

    static isAuthorizationExpired(authorization: AuthorizeResult): Boolean {
        console.log('isAuthorizationExpired called =');
        const expirationTimestamp = dayjs(authorization.accessTokenExpirationDate).subtract(
            refreshConfig.value,
            refreshConfig.unit,
        );
        console.log('expirationTimestamp=', expirationTimestamp);
        const currentTimestamp = dayjs();
        console.log('currentTimestamp=', currentTimestamp);
        return currentTimestamp.isAfter(expirationTimestamp) ? true : false;
    }
}

export default AuthenticationManager;
