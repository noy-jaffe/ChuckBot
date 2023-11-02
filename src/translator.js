const TextTranslationClient = require("@azure-rest/ai-translation-text").default

const findLanguageHandler = require('./source/getLanguageCode')

const key = "18f077c3a4b94f039228248acb45a949";
const endpoint = "https://translatorainoy.cognitiveservices.azure.com/";
const region = "eastus";


 async function returnTranslatedTText(inputText, newLanguage)  {
     const translateCredential = {
        key: key,
        region,
    };
    const translationClient = new TextTranslationClient(endpoint,translateCredential);
    const translateResponse = await translationClient.path("/translate").post({
        body: [{text: inputText}],
        queryParameters: {
            to: newLanguage,
            from:"he" ,
        },
    });
     return  translateResponse.body[0].translations[0].text;

}

async function firstResponse(newLanguageName)  {
    let newLanguageCode = await findLanguageHandler.findLanguageCodeByLanguageName(newLanguageName);
    // translate the text to the wanted language and return
    if (newLanguageCode != null){
        let inputText = "אין בעיה";
        return await returnTranslatedTText(inputText, newLanguageCode);
    }
    return null;
 }


module.exports = {firstResponse};