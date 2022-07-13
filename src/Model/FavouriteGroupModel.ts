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

        let _id = `${new Date().getTime()}`;
        if(response.name.toLowerCase().trim() == 'default'){
            _id = `Default`;
        }

        object.id = _id;
        object.name = response.name;
        return object;
    }
}
