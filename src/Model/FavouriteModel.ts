//to declare all required variables
export interface IFavoriteModel {
    id: string;
    favoriteGroupName: string;
    uniqueId: string;
}

export class FavoriteModel implements IFavoriteModel {
    id: string = '0';
    favoriteGroupName: string;
    uniqueId: string;

    static generate(response: any) {
        let object: IFavoriteModel = {
            favoriteGroupName: '',
            id: '0',
            uniqueId: '',
        };

        object.id = `${new Date().getTime()}`;
        object.favoriteGroupName = response.favoriteGroupName;
        object.uniqueId = response.uniqueId;
        return object;
    }
}
