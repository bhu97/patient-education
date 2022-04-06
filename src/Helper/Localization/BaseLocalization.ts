import { LocalizationManager } from './LocalizationManager';

/**
 * Add string here
 * also add translation in Locales file
 */
export const BaseLocalization = {
    welcome: LocalizationManager.strings('welcome'),
    howAreYou: LocalizationManager.strings('howAreYou'),
    noInternetConnection: LocalizationManager.strings('noInternetConnection'),
};
