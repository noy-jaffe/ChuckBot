// Package
const TelegramBot = require('node-telegram-bot-api');

// functions
const QuoteHandler = require('./source/getQuote')
const translatorHandler = require('./translator')

// Initialize the bot
const token = '6663098087:AAEsGkUdlZI121bvDh49nhh0q4w-Eq6PXGw';
const bot = new TelegramBot(token, {polling: true});

let currLanguage = "en";

// Start handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to ChuckBot! " +
        "Send 'set language [language]' to set your preferred language.");
});

// Set language handler
bot.onText(/set language (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userLanguage = match[1].toLowerCase(); // Extracted language preference

    const exampleSetLanguageEnglish = "Please provide a valid language preference. For example, 'set language english'.";
    if (userLanguage) {
        // answer first response
        let answer = await translatorHandler.firstResponse("אין בעיה", userLanguage);
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

const numberPattern = /^(([0-9])+)$/;

bot.onText(numberPattern, async (msg, match) => {
        const chatId = msg.chat.id;
        const number = parseInt(match[0]);
        console.log(number);

        if (number >= 1 && number <= 101) {
            //todo add chuckScraper
            try {
                let inputText = QuoteHandler.getQuote(number).retValue;
                let answer = await translatorHandler.returnTranslatedTText(inputText, currLanguage, "en");
                bot.sendMessage(chatId, answer);
            } catch (e) {
                bot.sendMessage(chatId, e);
            }
        } else {
            // Not valid int in the specified range.
            bot.sendMessage(chatId, 'Please send an integer between 1 and 101');
        }
    }
);