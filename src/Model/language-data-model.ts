//to declare all required variables
 interface IGroupModel {
    id?: string;
    allLanguage:string[],
    currentLangData:string[],
    currentSelectedLangCode:string
}

export class LanguageDataModel implements IGroupModel {
    id?: string = '0';
    allLanguage: string[];
    currentLangData:string[];
    currentSelectedLangCode:string;
    
    static generate(response: any) {
        let object: IGroupModel = {
            allLanguage:[],
            id: '0',
            currentLangData:[],
            currentSelectedLangCode:''
        };
        let _id = `${new Date().getTime()}`;
        object.id = _id;
        object.allLanguage = response.lastModifyDate;
        object.currentLangData = response.createdDateTime;
        object.currentSelectedLangCode = response.currentSelectedLangCode
        return object;
    }
}
