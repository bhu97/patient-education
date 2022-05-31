import { API_NAMES } from '../Constant/Constants';
import { filterVersionFiles, filterWhitelistFiles, filterLinkedFilesFolder } from '../Helper/Helper';
import LogManager from '../Helper/LogManager';
import { DriveItemModel } from '../Model/DriveItemModel';
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
        console.log(user);

        const countries = await this.getAllAvailableCountries();
        console.log(countries);

        let userCountry = countries[1];
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

            //RULE : filter out all files that start with a dot e.g. .flex
            rootItemData = filterVersionFiles(rootItemData);
            LogManager.debug('rootItemData flex/light filter =', rootItemData);

            //RULE : filter out all files that start with a dot e.g.  any whitelist.txt
            rootItemData = filterWhitelistFiles(rootItemData);
            LogManager.debug('rootItemData whitelist filter =', rootItemData);

            //RULE: filter out any folder that is named Linked Files
            rootItemData = filterLinkedFilesFolder(rootItemData);
            console.log('rootItemData Linked filter=', rootItemData);

            LogManager.debug('rootItemData final=', rootItemData);
            return rootItemData;
        } else {
            //TODO: add no data condition
            LogManager.debug('no data for ', countryCode);
            return [];
        }
    }
}

const dbHelper = new DBhelper();

export default dbHelper;
