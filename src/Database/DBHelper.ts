import { API_NAMES } from '../Constant/Constants';
import { applyDriveItemFilter, normalizeUrl, notEmpty } from '../Helper/Helper';
import LogManager from '../Helper/LogManager';
import { DriveItemModel, IDriveItem } from '../Model/DriveItemModel';
import { MoreInfoListModel } from '../Model/MoreInfoListModel';
import { IUser, UserModel } from '../Model/UserModel';
import { DatabaseManager } from './DatabaseManager';
import { DriveItemSchema, UserSchema } from './Schema';

export class DBhelper {
    /**
     * get all available country list for the drive DB
     * @returns country array if success or null
     */
    async getAllAvailableCountries(): Promise<string[] | null> {
        const countryData = DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `parentReferenceId == '${API_NAMES.ROOT_ID}'`,
        );
        LogManager.debug('countryData=', countryData);

        const driveItemsNoMaster = countryData?.filter(
            (driveItem) => driveItem.name! !== DatabaseManager.getInstance().kMasterFolderName,
        );
        if (driveItemsNoMaster) {
            return driveItemsNoMaster
                ?.flatMap((driveItem) => driveItem.name!)
                .sort((name1, name2) => name1.localeCompare(name2));
        }
        return null;
    }

    /**
     * get user data from user DB
     * @returns
     */
    async getUser(): Promise<IUser | null> {
        const user = await DatabaseManager.getInstance().getEntities(UserSchema.name, `id == '${API_NAMES.USER_ID}'`);
        return user[0];
    }

    /**
     * cretae user into DB with country code
     * @param country
     */
    async createUser(country: string) {
        await DatabaseManager.getInstance().createEntity(UserSchema.name, UserModel.generate(country));
    }

    /**
     * if user does not exist create user into DB and return the country code
     * if exist return country code
     * @returns
     */
    async createUserIfEmpty(): Promise<string> {
        const user = await this.getUser();
        LogManager.info('user=', user);

        const countries = await this.getAllAvailableCountries();
        LogManager.info('countries=', countries);

        let userCountry = 'GBR'; //countries[1];
        if (!user) {
            // first time so create user
            await this.createUser(userCountry);
        } else {
            // in case there is no country selected although we have a user
            //we select some country
            if (user.country == '') {
                if (countries && countries.length > 0) {
                    await this.createUser(userCountry);
                }
            } else {
                userCountry = user.country;
            }
        }
        return userCountry;
    }

    /**
     * get all data in array of drive model for particular country
     * @param countryCode
     * @returns [] of Drive model if success
     */
    async getRootItemsForCountry(countryCode: string): Promise<DriveItemModel[]> {
        const rootItems = await DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `webUrl == '${API_NAMES.ROOT_WEB_URL + countryCode}'`,
        );
        LogManager.debug('rootItems=', rootItems);

        if (rootItems.length > 0) {
            //map 0 index to drive item model
            let rootItem = rootItems[0] as DriveItemModel;

            //get all matching drive items
            let rootItemData = DatabaseManager.getInstance().getEntities(
                DriveItemSchema.name,
                `parentReferenceId == '${rootItem.uniqueId}'`,
            );
            LogManager.debug('rootItemData original=', rootItemData);

            //Apply all filter on drive item data
            rootItemData = applyDriveItemFilter(rootItemData);

            LogManager.debug('rootItemData final=', rootItemData);

            return rootItemData;
        } else {
            //TODO: add no data condition
            LogManager.debug('no data for ', countryCode);
            return [];
        }
    }

    //
    async getForSelectedCategory(selectedItem: IDriveItem): Promise<DriveItemModel[]> {
        //get all matching drive items
        let itemData = DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `parentReferenceId == '${selectedItem.uniqueId}'`,
        );
        LogManager.debug('getForSelectedCategory itemData original=', itemData);

        LogManager.debug('rootItemData original=', itemData);

        //Apply all filter on drive item data
        itemData = applyDriveItemFilter(itemData);

        LogManager.debug('rootItemData final=', itemData);

        return itemData;
    }

    async getItemsForContentPageWebUrls(webUrls: string[]): Promise<MoreInfoListModel[]> {
        /*      let items = await DatabaseManager.getInstance().getEntities(
            DriveItemSchema.name,
            `contentType == 'Document Set'`,
        );
        
        LogManager.info('items=', items);

        let itemsForWeb: IDriveItem[] = [];
        for (let webUrl of webUrls) {
            let item = items.filter((driveItem) => {
                if (driveItem.webUrl) {
                    return driveItem.webUrl.includes(normalizeUrl(webUrl));
                }
                return false;
            });

            itemsForWeb.push(item[0]);
        }
*/
        let itemsForWeb: IDriveItem[] = [];
        for (let webUrl of webUrls) {
            let items = DatabaseManager.getInstance().getEntities(
                DriveItemSchema.name,
                'webUrl CONTAINS ' + `'${normalizeUrl(webUrl)}' && contentType == 'Document Set'`,
            );
            LogManager.info('items=', items);
            itemsForWeb.push(items[0]);
        }

        LogManager.info('itemsForWeb=', itemsForWeb);
        let moreInfoData = [];
        if (itemsForWeb.length > 0) {
            for (let itemForWeb of itemsForWeb) {
                let itemData = DatabaseManager.getInstance().getEntities(
                    DriveItemSchema.name,
                    `uniqueId == '${itemForWeb.uniqueId}'`,
                );

                LogManager.debug('itemData original=', itemData[0]);

                let moreInfoObj = {
                    uniqueId: itemData[0].uniqueId,
                    title: itemData[0].title,
                    webUrl: itemForWeb.webUrl,
                    isFolder: true,
                    fileSize: 0,
                };
                moreInfoData.push(moreInfoObj);
            }
            return moreInfoData;
        } else {
            return [];
        }
    }
}

const dbHelper = new DBhelper();

export default dbHelper;
