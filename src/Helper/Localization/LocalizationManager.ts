import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18n-js';
import { I18nManager } from 'react-native';
import { LANGUAGE_CONSTANT } from '../../Constant/Constants';
import deviceManager from '../DeviceManager';
import en_US from './Locales/en_US.json';
import gr from './Locales/gr.json';

export class LocalizationManager {
    /**
     *
     * @param newLanguage
     */
    static setAppLanguage(newLanguage: string) {
        I18n.locale = newLanguage;
        // save it to local storage for next time
        AsyncStorage.setItem(LANGUAGE_CONSTANT.APP_LANGUAGE, newLanguage);
    }

    static getLocalizedStrings(name: string) {
        const str = I18n.t(name);
        return str;
    }

    //used when dynamically replace complete data
    static updateTranslation = (data: any) => {
        if (data === undefined) {
            return;
        }
        let en_USData = data.en_US ? data.en.translation : en_US;
        let grData = data.hi ? data.hi.translation : gr;

        I18n.fallbacks = true;

        I18n.translations.en_US = en_USData;
        I18n.translations.gr = grData;

        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
    };

    /**
     * initialize Application Language
     */
    static initializeAppLanguage = async () => {
        I18n.fallbacks = true;
        I18n.translations = { en_US, gr };
        I18n.locale = LANGUAGE_CONSTANT.DEFAULT_LANGUAGE;

        const currentLanguage = await AsyncStorage.getItem(LANGUAGE_CONSTANT.APP_LANGUAGE);
        if (currentLanguage) {
            LocalizationManager.setAppLanguage(currentLanguage);
        } else {
            //default language supported by app
            let localeLanguageCode = LANGUAGE_CONSTANT.DEFAULT_LANGUAGE;

            //get short label of all supported language , this is as per device language return like en_us(english_usa), mr_in(marathi indiaa)
            const supportedLanguaage = LANGUAGE_CONSTANT.LANGUAGES.map((item) => item.shortLabel);

            //check if device language is supported by app, if yes set it to local language
            if (supportedLanguaage.includes(deviceManager.deviceLanguage())) {
                localeLanguageCode = deviceManager.deviceLanguage();
            }

            // set language
            LocalizationManager.setAppLanguage(localeLanguageCode);
        }
    };
}

export default LocalizationManager;
