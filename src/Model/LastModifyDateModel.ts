//to declare all required variables
 interface IGroupModel {
    id: string;
    lastModifyDate: string;
    createdDateTime: string;
}

export class LastModifyDateModel implements IGroupModel {
    id: string = '0';
    lastModifyDate: string;
    createdDateTime:string;
    static generate(response: any) {
        let object: IGroupModel = {
            lastModifyDate: '',
            id: '0',
            createdDateTime:''
        };
        let _id = `${new Date().getTime()}`;
        object.id = _id;
        object.lastModifyDate = response.lastModifyDate;
        object.createdDateTime = response.createdDateTime;
        return object;
    }
}
