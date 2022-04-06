/**
 * Add device specific HTTP
 */
export const HTTP_METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

/**
 * Add device specific constant
 */
export const DEVICE_CONSTANT = {
    android: 'Android',
    iOS: 'iOS',
    tablet: 'Tablet',
    smartphone: 'Smartphone',
};

/** Locale constant define the Supported Languages of Application
 * en - english
 * gr - German
 */
export const LANGUAGE_CONSTANT = {
    //defaault Application supported languages
    DEFAULT_LANGUAGE: 'en_US',
    // key to savae deafult language in async storage
    APP_LANGUAGE: 'appLanguage',
    // all supportive language
    LANGUAGES: [
        { key: 'en', label: 'English (USA)', shortLabel: 'en_US' },
        { key: 'gr', label: 'German', shortLabel: 'gr' },
    ],
};

export const API_NAMES = {
    GET_REACT: 'users?delay=1',
    ERROR_CHECK: 'invalid-url',
};
