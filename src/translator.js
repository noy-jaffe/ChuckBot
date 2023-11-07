const TextTranslationClient = require("@azure-rest/ai-translation-text").default
const findLanguageHandler = require('./source/getLanguageCode')

const key = "18f077c3a4b94f039228248acb45a949";
const endpoint = "https://translatorainoy.cognitiveservices.azure.com/";
const region = "eastus";


 async function returnTranslatedTText(inputText, newLanguage, oldLanguage)  {
     const translateCredential = {
        key: key,
        region,
    };
    const translationClient = new TextTranslationClient(endpoint,translateCredential);
    const translateResponse = await translationClient.path("/translate").post({
        body: [{text: inputText}],
        queryParameters: {
            to: newLanguage,
            from: oldLanguage ,
        },
    });
     return  translateResponse.body[0].translations[0].text;

}

async function firstResponse(inputText, newLanguageName)  {
    let newLanguageCode = await findLanguageHandler.findLanguageCodeByLanguageName(newLanguageName);
    // translate the text to the wanted language and return
    if (newLanguageCode != null){
        const translated = await returnTranslatedTText(inputText, newLanguageCode, "he");
        if(translated != null) {
            return {translated,newLanguageCode};
        }
    }
    return null;
 }


module.exports = {firstResponse, returnTranslatedTText};