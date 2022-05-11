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
    ROOT_PATH: '/teams/FMETS0447212/',
    ROOT_ID: '01CF5DFEN6Y2GOVW7725BZO354PWSELRRZ',
    FIRST_LEVEL_PATH: '/teams/FMETS0269990/Shared%20Documents/',
    ROOT_WEB_URL: 'https://fresenius.sharepoint.com/teams/FMETS0447212/Shared%20Documents/',
    ROOT_LOGIN_URL: 'https://fresenius.sharepoint.com/',
    ROOT_LOGOUT_URL: 'https://fresenius.sharepoint.com/_layouts/15/SignOut.aspx',

    //Configuration
    REDIRECT_URI: 'preisfindungstool://auth/',

    INTERACTIVE_LOGIN_HOSTS: ['fresenius.com', 'login.microsoftonline.com'],

    //Endpoints
    AUTHORIZATION_ENDPOINT: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    TOKEN_ENDPOINT: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    AAD_ENDPOINT_HOST: 'https://login.microsoftonline.com/',
    GRAPH_ENDPOINT_HOST: 'https://graph.microsoft.com/',

    // RESOURCES
    GRAPH_ME_ENDPOINT: 'v1.0/me',
    GRAPH_MAIL_ENDPOINT: 'v1.0/me/messages',
    GRAPH_DELTA_ENDPOINT:
        'https://graph.microsoft.com/v1.0/drives/b!EKRo7XQXvUyRuOIkA9DjxunkygQdu11AmW6wdTRwuw91Ixe2mdV7RoMnMBsg3DoG/root/delta?$select=id, sharepointIds, title, name, webUrl, fields, parentReference, file, lastModifiedDateTime, size',
    GRAPH_DRIVEITEMS_ENDPOINT:
        'https://graph.microsoft.com/v1.0/sites/ed68a410-1774-4cbd-91b8-e22403d0e3c6/lists/b6172375-d599-467b-8327-301b20dc3a06/items?$expand=fields, driveitem&$select=fields, id, contentType',
    GRAPH_DRIVEITEM_ENDPOINT: (itemId: string) =>
        `https://graph.microsoft.com/v1.0/sites/ed68a410-1774-4cbd-91b8-e22403d0e3c6/lists/b6172375-d599-467b-8327-301b20dc3a06/items/${itemId}?$expand=driveItem`,
    GRAPH_LASTMODIFIED_DATE:
        'https://graph.microsoft.com/v1.0/drives/b!EKRo7XQXvUyRuOIkA9DjxunkygQdu11AmW6wdTRwuw91Ixe2mdV7RoMnMBsg3DoG/root/delta?$top=1&$orderBy=lastModifiedDateTime+DESC',
    GRAPH_THUMBNAILS_ENDPOINT: (uniqueId: string) =>
        `https://graph.microsoft.com/v1.0/drives/b!EKRo7XQXvUyRuOIkA9DjxunkygQdu11AmW6wdTRwuw91Ixe2mdV7RoMnMBsg3DoG/items/${uniqueId}/children?$expand=thumbnails`,
    GRAPH_ITEM_THUMBNAIL_ENDPOINT: (uniqueId: string) =>
        `https://graph.microsoft.com/v1.0/drives/b!EKRo7XQXvUyRuOIkA9DjxunkygQdu11AmW6wdTRwuw91Ixe2mdV7RoMnMBsg3DoG/items/${uniqueId}?$expand=thumbnails`,
    // SCOPES
    GRAPH_SCOPES: [
        'offline_access', /// Needed to receive a refresh token
        'User.Read', /// Allows read access to the users profile information
        'Files.ReadWrite.All', /// Allows read and write access to all files the user has appropriate permissions for.
        'Sites.ReadWrite.All', /// Allows read and write access to all sites the user has appropriate permissions for.
    ],
    KNOWN_AUTHORITIES: [
        'https://login.microsoftonline.com/',
        'https://login.microsoftonline.com/c98df534-5e36-459a-ac3f-8c2e449863bd',
        'https://login.microsoftonline.com/organizations',
    ],
};
