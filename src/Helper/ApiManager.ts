import axios from 'axios';
import authenticationManager from '../Authentication/AuthenticationManager';
import { envConfiguration } from './EnvConfigurations';
import LogManager from './LogManager';

class ApiManager {
    /**
     *
     * @param endPoint
     * @param httpMethodName
     * @param params
     * @returns
     */
    async callApiToGetData(endPoint: string, httpMethodName: any, params?: any) {
        LogManager.info('endPoint=', endPoint);
        LogManager.debug('httpMethodName=', httpMethodName);

        if (params === null) {
            params = {};
        }

        LogManager.info('params=', params);
        const accessToken = await authenticationManager.getAccessToken();
        LogManager.info('callApiToGetData token=', accessToken);

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };
        LogManager.info('headers=', headers);

        let response = null;
        try {
            response = await axios({
                method: httpMethodName,
                url: endPoint, // envConfiguration.api.host + endPoint,
                headers: headers,
                params: params ? params : {},
            });
            LogManager.info('response received=', response);
        } catch (error) {
            // any HTTP error is caught here
            // can extend this implementation to customiz the error messages
            // ex: dispatch(loadTodoError("Sorry can't talk to our servers right now"));
            LogManager.info('catch response=', error);
            response = null;
        }
        LogManager.debug('callApiToGetData return=', response);
        return response;
    }
}
const apiManager = new ApiManager();
export default apiManager;
