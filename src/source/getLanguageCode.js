const axios = require("axios");

async function findLanguageCodeByLanguageName(languageName) {
    const url = "https://api.cognitive.microsofttranslator.com/Languages?api-version=3.0&scope=translation";

    try {
        // Make the API request and store the response data
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const languageData = JSON.parse(Buffer.from(response.data).toString('utf8'));

        if (languageData && languageData.translation) {
            const languages = languageData.translation;

            for (const code in languages) {
                if (languages.hasOwnProperty(code)) {
                    const language = languages[code];
                    if (language.name.toLowerCase() === languageName) {
                        return code; // Return the language code if found
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // Return null if the language is not found or if there was an error
    return null;
}


module.exports = { findLanguageCodeByLanguageName };


