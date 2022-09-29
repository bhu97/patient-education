//to declare all required variables
 interface IGroupModel {
    id?: string;
    allLanguage:[],
    currentLangData:{},
    currentSelectedLangCode:string,

}

export class LanguageDataModel implements IGroupModel {
    id?: string = 'Language_Data_Present';
    allLanguage: [];
    currentLangData:{};
    currentSelectedLangCode:string;
    
    static generate(response: any) {
        let object: IGroupModel = {
            allLanguage:[],
            id: '0',
            currentLangData:{},
            currentSelectedLangCode:'',
        };
        let _id = `Language_Data_Present`;
        object.id = _id;
        object.allLanguage = response.allLanguage;
        object.currentLangData = response.currentLangData;
        object.currentSelectedLangCode = response.currentSelectedLangCode
        return object;
    }
}
