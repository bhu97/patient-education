import axios from 'axios';
import { envConfiguration } from './EnvConfigurations';
import logManager from './LogManager';
import { NetworkManager } from './NetworkManager';

class ApiManager {
    /**
     * Used to create request header
     * @param headers
     * @returns
     */
    private createHeaders(headers?: any) {
        if (headers === null) {
            headers = {};
        }
        headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return headers;
    }

    /**
     *
     * @param endPoint : Api end point name
     * @param httpMethodName : Method name from HTTP Method from Helper constant file (like GET, POST)
     */
    apiCall(endPoint: string, httpMethodName: any, params?: any) {
        //TODO: need to update to check n/w

        logManager.info('endPoint=', endPoint);
        logManager.debug('httpMethodName=', httpMethodName);
        logManager.warn('=>', `${envConfiguration.api.host}${endPoint}`);

        return new Promise((resolve, reject) => {
            axios({
                method: httpMethodName,
                url: envConfiguration.api.host + endPoint,
                headers: this.createHeaders(),
                params: params ? params : {},
            })
                .then(function ({ data }) {
                    logManager.info('API response success=', data);
                    resolve(data);
                })
                .catch(function (error) {
                    logManager.error('API response error=', error);
                    reject(error);
                });
        });
    }

    /**
     *
     * @param endPoint
     * @param httpMethodName
     * @param params
     * @returns
     */
    async callApiToGetData(endPoint: string, httpMethodName: any, params?: any) {
        logManager.info('endPoint=', endPoint);
        logManager.debug('httpMethodName=', httpMethodName);
        logManager.warn('=>', `${envConfiguration.api.host}${endPoint}`);

        let response = await axios({
            method: httpMethodName,
            url: envConfiguration.api.host + endPoint,
            headers: this.createHeaders(),
            params: params ? params : {},
        });
        logManager.debug('callApiToGetData ', response);
        return response;
    }
}
const apiManager = new ApiManager();
export default apiManager;
