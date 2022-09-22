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
}



class BaseLocalizations implements IGroupModel {

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

    static generate(response: any) {
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
        };

            object.welcome = response.welcome,
            object.pleaseWait = response.pleaseWait,
            object.howAreYou = response.howAreYou,
            object.noInternetConnection = response.noInternetConnection,
            object.favoriteTitle = response.favoriteTitle,
            object.favoriteSubTitle = response.favoriteSubTitle,
            object.settingTitle = response.settingTitle,
            object.settingSubTitle = response.settingSubTitle,
            object.generalTitle = response.generalTitle,
            object.technicalTitle = response.technicalTitle,
            object.contact = response.contact,
            object.countryTitle = response.countryTitle,
            object.contentTitle = response.contentTitle,
            object.updateTitle = response.updateTitle,
            object.selectCategory = response.selectCategory,
            object.appInformation = response.appInformation,
            object.version = response.version,
            object.modificationDate = response.modificationDate,
            object.contentUpdates = response.contentUpdates,
            object.moreInfoTitle = response.moreInformation,
            object.addRemoveFavorite = response.addRemoveFavorite,
            object.removeLocally = response.removeLocally,
            object.download = response.download,
            object.fileOptions = response.fileOptions,
            object.noDataText = response.noDataText,
            object.noDataOnGrid = response.noDataOnGrid,
            object.favTitleText = response.favTitleText,
            object.favSubTitleText = response.favSubTitleText,
            object.reTry = response.reTry,
            object.authFailed = response.authenticationFailed,
            object.cancel = response.cancel,
            object.login = response.login,
            object.noFavTitle = response.noFavTitle,
            object.addToFav = response.addToFav,
            object.okayButton = response.okayButton,
            object.editTitle = response.editTitle,
            object.editSubTitle = response.editSubTitle,
            object.newListTitle = response.newListTitle,
            object.newListSubTitle = response.newListSubTitle,
            object.save = response.save,
            object.lists = response.lists,
            object.checkSubTitle = response.checkSubTitle,
            object.submit = response.submit,
            object.logout = response.logout,
            object.logoutNow = response.logoutNow,
            object.downloadFolder = response.downloadFolder,
            object.removeFolder = response.removeFolder,
            object.folderOptions = response.folderOptions,
            object.commonError = response.commonError,
            object.fileDownloaded = response.fileDownloaded,
            object.fileRemove = response.fileRemove,
            object.placeholder = response.placeholder

        return object;

    }

};

let BaseLocalization = new BaseLocalizations();
export default BaseLocalization;