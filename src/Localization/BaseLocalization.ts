import { LocalizationManager } from './LocalizationManager';

/**
 * Add string here
 * also add translation in Locales file
 */
interface IGroupModel {
    welcome: string,
    pleaseWait: string,
    howAreYou: string,
    noInternetConnection: string,
    favoriteTitle: string,
    favoriteSubTitle: string,
    settingTitle: string,
    settingSubTitle: string,
    generalTitle: string,
    technicalTitle: string,
    contact: string,
    countryTitle: string,
    contentTitle: string,
    updateTitle: string,
    selectCategory: string,
    appInformation: string,
    version: string,
    modificationDate: string,
    contentUpdates: string,
    moreInfoTitle: string,
    addRemoveFavorite: string,
    removeLocally: string,
    download: string,
    fileOptions: string,
    noDataText: string,
    noDataOnGrid: string,
    favTitleText: string,
    favSubTitleText: string,
    reTry: string,
    authFailed: string,
    cancel: string,
    login: string,
    noFavTitle: string,
    addToFav: string,
    okayButton: string,
    editTitle: string,
    editSubTitle: string,
    newListTitle: string,
    newListSubTitle: string,
    save: string,
    lists: string,
    checkSubTitle: string,
    submit: string,
    logout: string,
    logoutNow: string,
    downloadFolder: string,
    removeFolder: string,
    folderOptions: string,
    commonError: string,
    fileDownloaded: string,
    fileRemove: string,
    placeholder: string,
    appLanguage:string,
}



 export default class BaseLocalization implements IGroupModel {
    welcome: string;
    pleaseWait: string;
    howAreYou: string;
    noInternetConnection: string;
    favoriteTitle: string;
    favoriteSubTitle: string;
    settingTitle: string;
    settingSubTitle: string;
    generalTitle: string;
    technicalTitle: string;
    contact: string;
    countryTitle: string;
    contentTitle: string;
    updateTitle: string;
    selectCategory: string;
    appInformation: string;
    version: string;
    modificationDate: string;
    contentUpdates: string;
    moreInfoTitle: string;
    addRemoveFavorite: string;
    removeLocally: string;
    download: string;
    fileOptions: string;
    noDataText: string;
    noDataOnGrid: string;
    favTitleText: string;
    favSubTitleText: string;
    reTry: string;
    authFailed: string;
    cancel: string;
  login: string;
    noFavTitle: string;
    addToFav: string;
    okayButton: string;
    editTitle: string;
    editSubTitle: string;
    newListTitle: string;
    newListSubTitle: string;
    save: string;
    lists: string;
    checkSubTitle: string;
    submit: string;
    logout: string;
    logoutNow: string;
    downloadFolder: string;
    removeFolder: string;
    folderOptions: string;
    commonError: string;
    fileDownloaded: string;
    fileRemove: string;
    placeholder: string;
    appLanguage: string;
   instanceObject: IGroupModel;
 
    static loclizationInstance: BaseLocalization;

    static getInstance() {
        if (BaseLocalization.loclizationInstance == null) {
            BaseLocalization.loclizationInstance = new BaseLocalization();
        }
        return BaseLocalization.loclizationInstance;
    }


    generate(response: any) {
        let object: IGroupModel = {
            welcome: '',
            pleaseWait: '',
            howAreYou: '',
            noInternetConnection: '',
            favoriteTitle: '',
            favoriteSubTitle: '',
            settingTitle: '',
            settingSubTitle: '',
            generalTitle: '',
            technicalTitle: '',
            contact: '',
            countryTitle: '',
            contentTitle: '',
            updateTitle: '',
            selectCategory: '',
            appInformation: '',
            version: '',
            modificationDate: '',
            contentUpdates: '',
            moreInfoTitle: '',
            addRemoveFavorite: '',
            removeLocally: '',
            download: '',
            fileOptions: '',
            noDataText: '',
            noDataOnGrid: '',
            favTitleText: '',
            favSubTitleText: '',
            reTry: '',
            authFailed: '',
            cancel: '',
            login: '',
            noFavTitle: '',
            addToFav: '',
            okayButton: '',
            editTitle: '',
            editSubTitle: '',
            newListTitle: '',
            newListSubTitle: '',
            save: '',
            lists: '',
            checkSubTitle: '',
            submit: '',
            logout: '',
            logoutNow: '',
            downloadFolder: '',
            removeFolder: '',
            folderOptions: '',
            commonError: '',
            fileDownloaded: '',
            fileRemove: '',
            placeholder: '',
            appLanguage:''
        };

            object.welcome = response.welcome ? response.welcome : LocalizationManager.getLocalizedStrings('welcome'),
            object.pleaseWait = response.pleaseWait ? response.pleaseWait : LocalizationManager.getLocalizedStrings('pleaseWait'),
            object.howAreYou = response.howAreYou ? response.howAreYou : LocalizationManager.getLocalizedStrings('howAreYou'),
            object.noInternetConnection = response.noInternetConnection ? response.noInternetConnection : LocalizationManager.getLocalizedStrings('howAreYou'),
            object.favoriteTitle = response.favoriteTitle ? response.favoriteTitle : LocalizationManager.getLocalizedStrings('favoriteTitle'),
            object.favoriteSubTitle = response.favoriteSubTitle ? response.favoriteSubTitle : LocalizationManager.getLocalizedStrings('favoriteSubTitle'),
            object.settingTitle = response.settingTitle ? response.settingTitle : LocalizationManager.getLocalizedStrings('settingTitle'),
            object.settingSubTitle = response.settingSubTitle ? response.settingSubTitle : LocalizationManager.getLocalizedStrings('settingSubTitle'),
            object.generalTitle = response.generalTitle ? response.generalTitle : LocalizationManager.getLocalizedStrings('generalTitle'),
            object.technicalTitle = response.technicalTitle ? response.technicalTitle : LocalizationManager.getLocalizedStrings('technicalTitle'),
            object.contact = response.contact ? response.contact : LocalizationManager.getLocalizedStrings('contact'),
            object.countryTitle = response.countryTitle ? response.countryTitle : LocalizationManager.getLocalizedStrings('countryTitle'),
            object.contentTitle = response.contentTitle ? response.contentTitle : LocalizationManager.getLocalizedStrings('contentTitle'),
            object.updateTitle = response.updateTitle ? response.updateTitle : LocalizationManager.getLocalizedStrings('updateTitle'),
            object.selectCategory = response.selectCategory ? response.selectCategory : LocalizationManager.getLocalizedStrings('selectCategory'),
            object.appInformation = response.appInformation ? response.appInformation : LocalizationManager.getLocalizedStrings('appInformation'),
            object.version = response.version ? response.version : LocalizationManager.getLocalizedStrings('version'),
            object.modificationDate = response.modificationDate ? response.modificationDate : LocalizationManager.getLocalizedStrings('modificationDate'),
            object.contentUpdates = response.contentUpdates ? response.contentUpdates : LocalizationManager.getLocalizedStrings('contentUpdates'),
            object.moreInfoTitle = response.moreInformation ? response.moreInformation : LocalizationManager.getLocalizedStrings('moreInformation'),
            object.addRemoveFavorite = response.addRemoveFavorite ? response.addRemoveFavorite : LocalizationManager.getLocalizedStrings('addRemoveFavorite'),
            object.removeLocally = response.removeLocally ? response.removeLocally : LocalizationManager.getLocalizedStrings('removeLocally'),
            object.download = response.download ? response.download : LocalizationManager.getLocalizedStrings('download'),
            object.fileOptions = response.fileOptions ? response.fileOptions : LocalizationManager.getLocalizedStrings('fileOptions'),
            object.noDataText = response.noDataText ? response.noDataText : LocalizationManager.getLocalizedStrings('noDataText'),
            object.noDataOnGrid = response.noDataOnGrid ? response.noDataOnGrid : LocalizationManager.getLocalizedStrings('noDataOnGrid'),
            object.favTitleText = response.favTitleText ? response.favTitleText : LocalizationManager.getLocalizedStrings('favTitleText'),
            object.favSubTitleText = response.favSubTitleText ? response.favSubTitleText : LocalizationManager.getLocalizedStrings('favSubTitleText'),
            object.reTry = response.reTry ? response.reTry : LocalizationManager.getLocalizedStrings('reTry'),
            object.authFailed = response.authenticationFailed ? response.authenticationFailed : LocalizationManager.getLocalizedStrings('authenticationFailed'),
            object.cancel = response.cancel ? response.cancel : LocalizationManager.getLocalizedStrings('cancel'),
            object.login = response.login ? response.login : LocalizationManager.getLocalizedStrings('login'),
            object.noFavTitle = response.noFavTitle ? response.noFavTitle : LocalizationManager.getLocalizedStrings('noFavTitle'),
            object.addToFav = response.addToFav ? response.addToFav : LocalizationManager.getLocalizedStrings('addToFav'),
            object.okayButton = response.okayButton ? response.okayButton : LocalizationManager.getLocalizedStrings('okayButton'),
            object.editTitle = response.editTitle ? response.editTitle : LocalizationManager.getLocalizedStrings('editTitle'),
            object.editSubTitle = response.editSubTitle ? response.editSubTitle : LocalizationManager.getLocalizedStrings('editSubTitle'),
            object.newListTitle = response.newListTitle ? response.newListTitle : LocalizationManager.getLocalizedStrings('newListTitle'),
            object.newListSubTitle = response.newListSubTitle ? response.newListSubTitle : LocalizationManager.getLocalizedStrings('newListSubTitle'),
            object.save = response.save ? response.save : LocalizationManager.getLocalizedStrings('save'),
            object.lists = response.lists ? response.lists : LocalizationManager.getLocalizedStrings('lists'),
            object.checkSubTitle = response.checkSubTitle ? response.checkSubTitle : LocalizationManager.getLocalizedStrings('checkSubTitle'),
            object.submit = response.submit ? response.submit : LocalizationManager.getLocalizedStrings('submit'),
            object.logout = response.logout ? response.logout : LocalizationManager.getLocalizedStrings('logout'),
            object.logoutNow = response.logoutNow ? response.logoutNow : LocalizationManager.getLocalizedStrings('logoutNow'),
            object.downloadFolder = response.downloadFolder ? response.downloadFolder : LocalizationManager.getLocalizedStrings('downloadFolder'),
            object.removeFolder = response.removeFolder ? response.removeFolder : LocalizationManager.getLocalizedStrings('removeFolder'),
            object.folderOptions = response.folderOptions ? response.folderOptions : LocalizationManager.getLocalizedStrings('folderOptions'),
            object.commonError = response.commonError ? response.commonError : LocalizationManager.getLocalizedStrings('commonError'),
            object.fileDownloaded = response.fileDownloaded ? response.fileDownloaded : LocalizationManager.getLocalizedStrings('fileDownloaded'),
            object.fileRemove = response.fileRemove ? response.fileRemove : LocalizationManager.getLocalizedStrings('fileRemove'),
            object.placeholder = response.placeholder ? response.placeholder : LocalizationManager.getLocalizedStrings('placeholder'),
            object.appLanguage = response.appLanguage ? response.appLanguage : LocalizationManager.getLocalizedStrings('appLanguage'),
          this.instanceObject = object
    }

    getObject=()=>{
        return this.instanceObject;
    }

};



