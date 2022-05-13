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
import LogManager from '../Helper/LogManager';

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

class AuthenticationManager {
    /**
     * @returns user token
     */
    getToken = async () => {
        LogManager.info('getToken called =');
        try {
            const result = await authorize(authConfig);
            LogManager.info('result=', authConfig);
            return result;
        } catch (error) {
            LogManager.error('error getToken=', JSON.stringify(error));
        }
    };

    /**
     * @returns user token
     */
    login = async (): Promise<AuthorizeResult | undefined> => {
        LogManager.info('login called =');
        try {
            const result = await authorize(authConfig);
            LogManager.info('result=', result);
            this.setAuthorization(result);
            return result;
        } catch (error) {
            LogManager.error('error login=', error);
        }
        return undefined;
    };

    /**
     * @returns authResult
     */
    refreshToken = async (authResult: AuthorizeResult): Promise<AuthorizeResult> => {
        LogManager.info('refreshToken called =');

        const refreshResult = await refresh(authConfig, {
            refreshToken: authResult.refreshToken || '',
        });
        authResult.accessToken = refreshResult.accessToken;

        authResult.refreshToken = refreshResult.refreshToken || '';
        authResult.accessTokenExpirationDate = refreshResult.accessTokenExpirationDate;

        console.info('Azure AD - Refreshed access token with: ', refreshResult);

        this.setAuthorization(authResult);
        return authResult;
    };

    getAccessToken = async (): Promise<string | undefined> => {
        LogManager.info('getAccessToken called =');
        let authorization = await this.getAuthorization();

        if (authorization) {
            LogManager.info('auth token exist');
            if (this.isAuthorizationExpired(authorization)) {
                authorization = await this.refreshToken(authorization);
            }
            console.info('Azure AD - Answering request for access token with: ' + authorization.accessToken);
            return authorization.accessToken;
        } else {
            LogManager.info('auth token does not exist, call login');
            authorization = await this.login();
        }

        return undefined;
    };

    getAuthorization = async () => {
        LogManager.info('getAuthorization called..');
        const raw = await AsyncStorage.getItem(storageKey);
        if (raw) {
            return JSON.parse(raw);
        }
        return undefined;
    };

    setAuthorization = async (authorizationResult: AuthorizeResult) => {
        LogManager.info('setAuthorization called =');
        const raw = JSON.stringify(authorizationResult);
        await AsyncStorage.setItem(storageKey, raw);
    };

    isAuthorizationExpired(authorization: AuthorizeResult): Boolean {
        LogManager.info('isAuthorizationExpired called =');
        const expirationTimestamp = dayjs(authorization.accessTokenExpirationDate).subtract(
            refreshConfig.value,
            refreshConfig.unit,
        );
        LogManager.info('expirationTimestamp=', expirationTimestamp);
        const currentTimestamp = dayjs();
        LogManager.info('currentTimestamp=', currentTimestamp);
        return currentTimestamp.isAfter(expirationTimestamp) ? true : false;
    }
}

//export default AuthenticationManager;
const authenticationManager = new AuthenticationManager();
export default authenticationManager;
