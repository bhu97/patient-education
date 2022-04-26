import { LocalizationManager } from './LocalizationManager';

/**
 * Add string here
 * also add translation in Locales file
 */
export const BaseLocalization = {
    welcome: LocalizationManager.getLocalizedStrings('welcome'),
    howAreYou: LocalizationManager.getLocalizedStrings('howAreYou'),
    noInternetConnection: LocalizationManager.getLocalizedStrings('noInternetConnection'),
    favoriteTitle: LocalizationManager.getLocalizedStrings('favoriteTitle'),
    favoriteSubTitle: LocalizationManager.getLocalizedStrings('favoriteSubTitle'),
    settingTitle: LocalizationManager.getLocalizedStrings('settingTitle'),
    settingSubTitle: LocalizationManager.getLocalizedStrings('settingSubTitle'),
    generalTitle: LocalizationManager.getLocalizedStrings('generalTitle'),
    technicalTitle: LocalizationManager.getLocalizedStrings('technicalTitle'),
    contact: LocalizationManager.getLocalizedStrings('contact'),
    countryTitle: LocalizationManager.getLocalizedStrings('countryTitle'),
    contentTitle: LocalizationManager.getLocalizedStrings('contentTitle'),
    updateTitle: LocalizationManager.getLocalizedStrings('updateTitle'),
    selectCatgory: LocalizationManager.getLocalizedStrings('selectCatgory'),
    appInformation: LocalizationManager.getLocalizedStrings('appInformation'),
    version: LocalizationManager.getLocalizedStrings('version'),
    modificationDate: LocalizationManager.getLocalizedStrings('modificationDate'),
    contentUpdates: LocalizationManager.getLocalizedStrings('contentUpdates'),
};
