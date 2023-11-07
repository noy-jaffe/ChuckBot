// Package
const TelegramBot = require('node-telegram-bot-api');

// functions
const ScraperHandler = require("./chuckScraper")
const QuoteHandler = require('./source/getQuote')
const translatorHandler = require('./translator')

// Initialize the bot
// const { BOT_TOKEN } = process.env;
const token = '6663098087:AAEsGkUdlZI121bvDh49nhh0q4w-Eq6PXGw';
const bot = new TelegramBot(token, {polling: true});
bot.setWebHook()

// Response messages
const welcomeText = "Welcome to ChuckBot! Please send 'set language [language]' to set your preferred language.";
const exampleSetLanguageEnglish = "Please provide a valid language preference. For example, 'set language english'.";
const noProblemTextHebrew = "אין בעיה";
const oldLanguage = "en";
const anIntegerBetween1And101 = 'Please send an integer between 1 and 101';

// Regexps
const startRegexp = /\/start/;
const setLanguageRegexp = /set language (.+)/;
const numberPattern = /^(([0-9])+)$/;

// Global param
let currLanguage = oldLanguage;
let initialized = null;


// Initialize chuck quotes
bot.on('message', (msg) => {
    if (initialized == null) {
        try {
            ScraperHandler.chuckScraper();
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
            try {
                let inputText = QuoteHandler.getQuote(number).retValue;
                let answer = await translatorHandler.returnTranslatedTText(inputText, currLanguage, oldLanguage);
                bot.sendMessage(chatId, answer);
            } catch (e) {
                bot.sendMessage(chatId, e);
            }
        } else {
            // Not valid int in the specified range.
            bot.sendMessage(chatId, anIntegerBetween1And101);
        }
    }
);

// Other invalid message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!startRegexp.test(text) && !setLanguageRegexp.test(text) && !numberPattern.test(text)) {
        bot.sendMessage(chatId, "Please choose from one of the options below:\n" +
            "1." + exampleSetLanguageEnglish + "\n" + "2." + anIntegerBetween1And101);
    }
})