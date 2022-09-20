



export class LanguageDataModel  {
  public languageData: LanguageObject[]  = [];

}
class LanguageObject {
  public languageCode:string;
  public listObject: {key:string,value:string}

}

 


// [
// {
//     language:"en",
//     "en.json":{
//         "devId":"valueDevId"
//     }
// },
// {
//     language:"pl",
//     "en.json":{
//         "devId":"valueDevId"
//     }
// },
// ]