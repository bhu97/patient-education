import { API_NAMES } from '../Constant/Constants';
import { applyDriveItemFilter, findCountry, normalizeUrl, notEmpty, sanitizeWebUrl } from '../Helper/Helper';
import LogManager from '../Helper/LogManager';
import { DriveItemModel, IDriveItem } from '../Model/DriveItemModel';
import { FavoriteGroupModel } from '../Model/FavouriteGroupModel';
import { FavoriteModel, IFavoriteModel } from '../Model/FavouriteModel';
import { LanguageDataModel } from '../Model/language-data-model';
import { LastModifyDateModel } from '../Model/LastModifyDateModel';
import { MoreInfoListModel } from '../Model/MoreInfoListModel';
import { IUserModel, UserModel } from '../Model/UserModel';
import { DatabaseManager } from './DatabaseManager';
import {
    DriveItemSchema,
    FavoriteGroupSchema,
    FavoriteSchema,
    LanguageDataSchema,
    LastModifyDateSchema,
    UserSchema,
} from './Schema';

export class DBhelper {
    /**
     * get all available country list for the drive DB
     * @returns country array if success or null
     */
    async getAllAvailableCountries(): Promise<UserModel[] | null> {
        const countryData = DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `parentReferenceId == '${API_NAMES.ROOT_ID}'`,
        );
        // LogManager.debug('countryData=', countryData);

        let userCountryModelData: any = [];
        for (let countryObject of countryData) {
            userCountryModelData.push(UserModel.generate(countryObject));
        }
        //LogManager.debug('userCountryModelData=', userCountryModelData);

        const userModelData = userCountryModelData.filter(function (userCountryModelObject) {
            if (userCountryModelObject.countryTitle && userCountryModelObject.countryName) {
                return UserModel.generate(userCountryModelObject);
            }
        });
        // LogManager.debug('userModelData=', userModelData);

        userModelData.sort((a, b) => a.countryName.localeCompare(b.countryName));

        return userModelData;
    }

    /**
     * get user data from user DB
     * @returns
     */
    async getUser(): Promise<IUserModel | null> {
        const user = await DatabaseManager.getInstance().getEntities(UserSchema.name, `id == '${API_NAMES.USER_ID}'`);
        return user[0];
    }

    /**
     * cretae user into DB with country code
     * @param userDetails
     */
    async createUser(userDetails: UserModel) {
        await DatabaseManager.getInstance().createEntity(UserSchema.name, userDetails);
    }

    removeUser(userDetails: IUserModel) {
        DatabaseManager.getInstance().removeRealmObject(UserSchema.name, userDetails);
    }

    /**
     * if user does not exist create user into DB and return the country code
     * if exist return country code
     * @returns
     */
    async createUserIfEmpty(): Promise<UserModel> {
        const userCountry = await this.getUser();
        //LogManager.info('userCountry=', userCountry);

        const countries: any = await this.getAllAvailableCountries();
        //LogManager.info('countries=', countries);
        console.log('countries=', countries)
        if(countries.length>1)
        var defaultUserCountry = countries.find((item) => item.countryName.toLocaleLowerCase() === 'master');
        else
        var defaultUserCountry = countries;
        //LogManager.info('defaultUserCountry=', defaultUserCountry);

        if (!userCountry) {
            // first time so create user
            await this.createUser(defaultUserCountry);
        } else {
            // in case there is no country selected although we have a user
            //we select some country
            if (userCountry.countryName == '') {
                if (defaultUserCountry) {
                    await this.createUser(defaultUserCountry);
                }
            }
        }
        //return default user
        return defaultUserCountry;
    }

    /**
     * get all data in array of drive model for particular country
     * @param userCountryModel
     * @returns [] of Drive model if success
     */
    async getRootItemsForCountry(userCountryModel: UserModel): Promise<DriveItemModel[]> {
        const rootItems = await DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `webUrl == '${userCountryModel.webUrl}'`,
        );
        //  LogManager.debug('rootItems=', rootItems);

        if (rootItems.length > 0) {
            //map 0 index to drive item model
            let rootItem = rootItems[0] as DriveItemModel;

            //get all matching drive items
            let rootItemData = DatabaseManager.getInstance().getEntities(
                DriveItemSchema.name,
                `parentReferenceId == '${rootItem.uniqueId}'`,
            );
            //LogManager.debug('rootItemData original=', rootItemData);

            //Apply all filter on drive item data
            rootItemData = applyDriveItemFilter(rootItemData);

            //sort by name
            rootItemData.sort(function (a, b) {
                return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
            });

            //LogManager.debug('rootItemData final=', rootItemData);

            return rootItemData;
        } else {
            //TODO: add no data condition
            LogManager.debug('no data for ', userCountryModel);
            return [];
        }
    }

    //
    async getForSelectedCategory(selectedItem: any): Promise<DriveItemModel[]> {
        //get all matching drive items
        let itemData = DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `parentReferenceId == '${selectedItem.uniqueId}'`,
        );
        //LogManager.debug('getForSelectedCategory itemData original=', itemData);

        //LogManager.debug('rootItemData original=', itemData);

        //Apply all filter on drive item data
        itemData = applyDriveItemFilter(itemData);

        //sort by name
        itemData.sort(function (a, b) {
            return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
        });

        //LogManager.debug('rootItemData final=', itemData);

        return itemData;
    }

    async getItemsForContentPageWebUrls(webUrls: string[], isFolder: boolean): Promise<MoreInfoListModel[]> {
        let itemsForWeb: IDriveItem[] = [];

        if (webUrls.length <= 0) {
            return [];
        }

        for (let webUrl of webUrls) {
            //normalize URL
            const normalizedWebUrl = normalizeUrl(webUrl);
            if (!normalizedWebUrl) continue;

            //sanitize url
            var sanitizedWebUrl = sanitizeWebUrl(normalizedWebUrl);
            if (!sanitizedWebUrl) continue;

            //decode ur remove special chars like %20
            const decodeWebUrl = decodeURIComponent(sanitizedWebUrl);
            if (!decodeWebUrl) continue;

            //get country code
            const countryCode = findCountry(decodeWebUrl);

            //name of folder
            const itemName = decodeWebUrl.split('/').slice(-1)[0];

            let items = DatabaseManager.getInstance().getEntities(
                DriveItemSchema.name,
                'name= ' + `'${itemName}'` + ' && country ==' + `'${countryCode}'`,
            );
            //LogManager.info('items=', items);

            if (items.length > 0) itemsForWeb.push(items[0]);
        }

        //LogManager.info('itemsForWeb=', itemsForWeb);
        let moreInfoData: any = [];
        if (itemsForWeb.length > 0) {
            for (let itemForWeb of itemsForWeb) {
                //      LogManager.info('itemForWeb=', itemForWeb);
                let itemData = DatabaseManager.getInstance().getEntities(
                    DriveItemSchema.name,
                    `uniqueId == '${itemForWeb.uniqueId}'`,
                );

                //LogManager.debug('itemData original=', itemData[0]);

                let moreInfoObj = {
                    uniqueId: itemData[0].uniqueId,
                    title: itemData[0].title != '' ? itemData[0].title : itemData[0].name,
                    webUrl: itemForWeb.webUrl,
                    isFolder: isFolder,
                    fileSize: 0,
                    linkedFolders: itemData[0].linkedFolders,
                    linkedFiles: itemData[0].linkedFiles,
                };
                moreInfoData.push(moreInfoObj);
            }
            return moreInfoData;
        } else {
            return moreInfoData;
        }
    }

    async getFavGroups(): Promise<FavoriteGroupModel[]> {
        //get all matching drive items
        let itemData = DatabaseManager.getInstance().getEntities(FavoriteGroupSchema.name, ``);
        //LogManager.debug('getFavGroups=======', itemData);
        return itemData;
    }

    async createFavGroup(data: FavoriteGroupModel) {
        await DatabaseManager.getInstance().createEntity(FavoriteGroupSchema.name, data);
    }

    async removeFavGroup(item: FavoriteGroupModel) {
        await DatabaseManager.getInstance().removeRealmObject(FavoriteGroupSchema.name, item);
    }

    // async createFavouriteEntries(data: FavoriteModel) {
    //     await DatabaseManager.getInstance().createEntity(FavoriteSchema.name, data);    
    // }
    async createFavouriteEntries(data: FavoriteModel[], uniqueId: String) {
        let items = DatabaseManager.getInstance().getEntities(FavoriteSchema.name, `uniqueId == '${uniqueId}'`);
        if (items.length > 0) {
            items.forEach(async (_element) => {
                await DatabaseManager.getInstance().deleteRealmObject(FavoriteSchema.name, _element.id);
            });
        }
        await DatabaseManager.getInstance().createEntity(FavoriteSchema.name, data);
    }

    async getFavItems(group: FavoriteGroupModel): Promise<DriveItemModel[]> {
        let items = await DatabaseManager.getInstance().getEntities(
            FavoriteSchema.name,
            `favoriteGroupName == '${group.id}'`,
        );
        //LogManager.debug('get Fav items=', items);

        return items;
    }
    async getFavItemsByUniqueId(uniqueId: string): Promise<FavoriteModel[]> {
        let items = await DatabaseManager.getInstance().getEntities(FavoriteSchema.name, `uniqueId == '${uniqueId}'`);
        //LogManager.debug('get items by unique ID=', items);
        return items;
    }

    async getItemDetailByUniqueId(uniqueId: string): Promise<DriveItemModel> {
        let item = await DatabaseManager.getInstance().getEntity(DriveItemSchema.name, uniqueId);
        return item;
    }

    async createLastDateModify(data: LastModifyDateModel) {
        await DatabaseManager.getInstance().createEntity(LastModifyDateSchema.name, data);
    }

    async getLastDateModify(): Promise<LastModifyDateModel[]> {
        //get all matching drive items
        let itemData = DatabaseManager.getInstance().getEntities(LastModifyDateSchema.name, ``);
        // LogManager.debug('LastModifyDateSchema=======', itemData);
        return itemData;
    }
    async createDriveItemEnteriesById(data: DriveItemModel, uniqueId: String) {
        // await DatabaseManager.getInstance().deleteRealmObject(DriveItemSchema.name, uniqueId);
        await DatabaseManager.getInstance().createEntity(DriveItemSchema.name, data);
    }

    async createLanguageData(data: LanguageDataModel) {
      
        let items = DatabaseManager.getInstance().getEntities(LanguageDataSchema.name, `id == 'Language_Data_Present'`);
      //  console.log("items lenght 301 ^^^^^^^^^^^",items.length);
        
        if (items.length > 0) {
            items.forEach(async (_element) => {
                await DatabaseManager.getInstance().deleteRealmObject(LanguageDataSchema.name, _element.id);
            });
        }

        await DatabaseManager.getInstance().createEntity(LanguageDataSchema.name, data);
    }

    async getLanguageData(): Promise<LanguageDataModel[]> {
        let itemData = DatabaseManager.getInstance().getEntities(LanguageDataSchema.name, ``);
       //  console.log("get lang ^^^^^^^^^^ 307 ^^^^^^^^^^^ $$$",JSON.stringify(itemData.length));
        return itemData;
    }


    async getDownloadItemFromDriveItem(): Promise<IDriveItem[] | null> {
        const downloadItemArray = await DatabaseManager.getInstance().getEntities(DriveItemSchema.name, `downloadLocation != null`);
        return downloadItemArray
    }

}

const dbHelper = new DBhelper();

export default dbHelper;
