import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18n-js';
import { I18nManager } from 'react-native';
import { LANGUAGE_CONSTANT } from '../Constant/Constants';
import deviceManager from '../Helper/DeviceManager';
import LogManager from '../Helper/LogManager';
import en_US from './Locales/en_US.json';
import gr from './Locales/gr.json';

export class LocalizationManager {
    constructor() {
        console.log('LocalizationManager constructor');
    }

    /**
     *
     * @param newLanguage
     */
    static setAppLanguage(newLanguage: string) {
        I18n.locale = newLanguage;
        // save it to local storage for next time
       // AsyncStorage.setItem(LANGUAGE_CONSTANT.APP_LANGUAGE, newLanguage);
    }

    static getLocalizedStrings(name: string) {
        //const str = I18n.t(name);
        const str = en_US[`${name}`]
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

        const orgDeviceLanguage =deviceManager.deviceLanguage();
        LogManager.debug('orgDeviceLanguage=', orgDeviceLanguage);
        const deviceLanguageStartWith = orgDeviceLanguage.split("_")[0]+"_";
        LogManager.debug('deviceLanguageStartWith=', deviceLanguageStartWith);

        var langResultArray = LANGUAGE_CONSTANT.LANGUAGES.filter(function (d) { 
            return Object.values(d).indexOf(deviceLanguageStartWith) != -1 
        });
        LogManager.debug("langResultArray=",langResultArray);

        if(langResultArray.length>0){
            var appLanguageCode = langResultArray[0].shortLabel;
        } else {
            var appLanguageCode = LANGUAGE_CONSTANT.DEFAULT_LANGUAGE;
        }
        LogManager.debug('appLanguageCode=',appLanguageCode);
        LocalizationManager.setAppLanguage(appLanguageCode);

    };
}

export default LocalizationManager;
