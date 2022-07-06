//to declare all required variables
export interface IGroupModel {
    id: string;
    name: string;
}

export class FavoriteGroupModel implements IGroupModel {
    id: string = '0';
    name: string;

    static generate(response: any) {
        let object: IGroupModel = {
            name: '',
            id: '0',
        };

        object.id = `${new Date().getTime()}`;
        object.name = response.name;
        return object;
    }
}
