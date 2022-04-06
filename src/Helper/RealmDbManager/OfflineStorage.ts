import Realm from "realm";
import {
    BookSchema, AuthorSchema
} from "./Schema";

class OfflineStorage {

    realm = new Realm({
        schema: [
            BookSchema,
            AuthorSchema,
        ],
        schemaVersion: 0.1,
    });

    async getAllEntities(schema: string) {
        return this.realm.objects(schema);
    }

    async createEntity(schema: string, data: any) {
        try {
            this.realm.write(async () => {
                await this.realm.create(schema, data);
            });
        } catch (err) {
            console.log(err);

        }
    }

    async deleteEntity(schema: string) {
        try {
            this.realm.write(() => {
                this.realm.delete(this.realm.objects(schema));
            });
        } catch (err) {
            console.log(err);
        }
    }
}

const offlineStorage = new OfflineStorage();
export default offlineStorage;
