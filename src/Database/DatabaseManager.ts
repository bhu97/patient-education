import Realm from 'realm';
import { API_NAMES } from '../Constant/Constants';
import { createDriveModelData } from '../Helper/Helper';
import LogManager from '../Helper/LogManager';
import { DriveItemModel } from '../Model/DriveItemModel';
import { fetchAllDriveItems, fetchAllListItems, fetchData } from '../Redux/app-data/appDataThunk';
import { DriveItemSchema, FavoriteGroupSchema, FavoriteSchema, UserSchema } from './Schema';

export class DatabaseManager {
    //Constants
    kParentReferenceId = 'parentReferenceId';
    kUniqueId = 'uniqueId';
    kName = 'name';
    kFavoriteGroupName = 'favoriteGroupName';
    kWebUrl = 'webUrl';
    kMasterFolderName = 'Master';
    kRegionalFolderName = 'Regional';
    kDefaultFavoriteGroupName = 'Default';
    kCountryRoot = (country: string) => {
        return `webUrl == '${API_NAMES.ROOT_WEB_URL + country}'`;
    };

    realm: Realm | undefined;

    constructor() {
        LogManager.info('Database constructor');
        //this.initializeDatabase();
    }

    /**
     * Initialize Database with all schema
     */
    async initializeDatabase() {
        LogManager.info('initializeDatabase started');
        try {
            this.realm = await Realm.open({
                path: 'patienteducation',
                schema: [DriveItemSchema, UserSchema, FavoriteSchema, FavoriteGroupSchema],
                schemaVersion: 1,
            });
            LogManager.info('setup database');
            //basic setup
            LogManager.info('size=', this.realm.empty);

            if (this.realm.empty) {
                // if DB is empty download and update DB
                LogManager.info('DB is empty..');
                const allDriveItems = await fetchData(API_NAMES.ALL_DRIVE_ITEM_ENDPOINT);
                LogManager.info('responses=', allDriveItems);

                const driveModelData = createDriveModelData(allDriveItems);
                LogManager.info('driveModelData=', driveModelData);

                const allListItems = await fetchData(API_NAMES.ALL_LIST_ITEM_ENDPOINT);
                LogManager.info('allListItems=', allListItems);
                const listModelData = createDriveModelData(allDriveItems);
                LogManager.info('listModelData=', listModelData);

                await this.saveDriveItems(driveModelData);
                LogManager.info('drive model saved=');

                await this.saveDriveItems(listModelData);
                LogManager.info('list model saved=');
            } else {
                LogManager.info('DB is not empty..');
            }
            LogManager.info('initializeDatabase finsihed');
        } catch (error) {
            LogManager.error('initializeDatabase error=', error);
        }
    }

    async superSave(item: Object): Promise<void> {
        this.realm?.write(() => {
            this.realm?.create(item.constructor.name, item, Realm.UpdateMode.Modified);
        });
    }

    async saveObjects(objects: any[], type: string) {
        try {
            this.realm?.write(() => {
                objects.forEach((object) => {
                    LogManager.info(object);
                    this.realm?.create(type, object, Realm.UpdateMode.Modified);
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    async saveDriveItems(items: Array<any>): Promise<void> {
        LogManager.info('db=>', this.realm);
        try {
            this.realm?.write(() => {
                items.forEach((driveItem) => {
                    LogManager.info(driveItem);
                    this.realm?.create('DriveItem', driveItem, Realm.UpdateMode.Modified);
                });
                //success()
            });
        } catch (error) {
            console.error(error);
        }
    }

    async get<T extends Realm.Object>(name: string, query?: string | undefined) {
        if (this.realm) {
            if (query) {
                return Array.from(this.realm.objects<T>(name).filtered(query));
            } else {
                return Array.from(this.realm.objects<T>(name));
            }
        }
    }

    getOne<T>(name: string, query?: string | undefined): T | undefined {
        if (this.realm) {
            if (query) {
                const results = this.realm.objects<T>(name).filtered(query);
                return Array.from(results)[0];
            } else {
                const results = this.realm.objects<T>(name);
                return Array.from(results)[0];
            }
        }
    }

    async delete<T extends Realm.Object>(name: string, query?: string | undefined) {
        return new Promise<void>((success, _) => {
            this.realm?.write(() => {
                if (query) {
                    const results = this.realm?.objects<T>(name).filtered(query);
                    this.realm?.delete(results);
                    success();
                } else {
                    const results = this.realm?.objects<T>(name);
                    this.realm?.delete(results);
                    success();
                }
            });
        });
    }

    hasValidLocalData(): boolean {
        const driveItemResults = this.realm?.objects('DriveItem');
        const userResults = this.realm?.objects('User');

        if (driveItemResults && userResults) {
            return driveItemResults.length > 0 && userResults.length > 0;
        }

        return false;
    }

    // async removeAllDriveItems(): Promise<void> {
    //   return await db.driveItems.clear()
    // }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
