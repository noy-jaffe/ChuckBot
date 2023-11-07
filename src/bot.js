// Package
const TelegramBot = require('node-telegram-bot-api');

// functions
const scraperHandler = require('./chuckScraper');
const translatorHandler = require('./translator')

// Initialize the bot
// const botApiKey = process.env.BOT_API_KEY;
const botApiKey = '6663098087:AAEsGkUdlZI121bvDh49nhh0q4w-Eq6PXGw';
const bot = new TelegramBot(botApiKey, {polling: true});

// Response messages
const welcomeText = "Welcome to ChuckBot! Please send 'set language [language]' to set your preferred language.";
const exampleSetLanguageEnglish = "Please provide a valid language preference. For example, 'set language english'.";
const noProblemTextHebrew = "אין בעיה";
const oldLanguage = "en";
const anIntegerBetween1And101 = 'Please send an integer between 1 and 101';
const menuResponse = "Please choose from one of the options below:\n" +
        "1." + exampleSetLanguageEnglish + "\n" + "2." + anIntegerBetween1And101;

// Error messages
const havingProblemMessage = "Sorry for the inconvinient, we are having some trouble handling your'e request."+
                "Please try again.";    
const errMessage = "Having problem while scraping the website";


// Regexps
const startRegexp = /\/start/;
const setLanguageRegexp = /set language (.+)/;
const numberPattern = /^(([0-9])+)$/;

// Global param
let currLanguage = oldLanguage;
let initialized = 0;
let quotesArray = null;


// Initialize chuck quotes
bot.on('message', async (msg) => {
    if (initialized == 0) {
        try {
            quotesArray = await scraperHandler.chuckScraper();
            initialized = 1;
        } catch (e) {
            console.error(e);
        }
    }
});


// Start handler
bot.onText(startRegexp, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, welcomeText);
});


// Set language handler
bot.onText(setLanguageRegexp, async (msg, match) => {
    const chatId = msg.chat.id;

    const userLanguage = match[1].toLowerCase(); // Extracted language preference
    if (userLanguage) {
        // answer first response
        let answer = await translatorHandler.firstResponse(noProblemTextHebrew, userLanguage);
        if (answer != null) {
            currLanguage = answer.newLanguageCode;
            bot.sendMessage(chatId, answer.translated);
        } else {
            bot.sendMessage(chatId,
                exampleSetLanguageEnglish);
        }
    } else {
        bot.sendMessage(chatId, exampleSetLanguageEnglish);
    }
});


// Handle other messages
bot.onText(numberPattern, async (msg, match) => {
        const chatId = msg.chat.id;
        const number = parseInt(match[0]);

        if (number >= 1 && number <= 101) {
            let inputText;
            try {
                // inputText = await scraperHandler.chuckScraper(number);
                inputText = quotesArray[number-1];
                if(inputText !== null){
                    let answer = await translatorHandler.returnTranslatedTText(inputText, currLanguage, oldLanguage);
                    bot.sendMessage(chatId, answer);
                } else{
                    console.error(errMessage);
                }
                
            } catch (e) {
                console.error(e);
            }
        } else {
            // Not valid int in the specified range.
            bot.sendMessage(chatId, await translatorHandler.returnTranslatedTText(anIntegerBetween1And101, currLanguage, oldLanguage));
        }
    }
);


// Other invalid message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!startRegexp.test(text) && !setLanguageRegexp.test(text) && !numberPattern.test(text)) {
        bot.sendMessage(chatId, menuResponse);
    }
})