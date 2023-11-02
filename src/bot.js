
// Package
const TelegramBot = require('node-telegram-bot-api');

// functions
const QuoteHandler = require('./source/getQuote')
const translatorHandler = require('./translator')

// Initialize the bot
const token = '6663098087:AAEsGkUdlZI121bvDh49nhh0q4w-Eq6PXGw';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to ChuckBot! " +
        "Send 'set language [language]' to set your preferred language.");
});

bot.onText(/set language (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userLanguage = match[1].toLowerCase(); // Extracted language preference

    if (userLanguage) {
        // answer first response
        let answer = await translatorHandler.firstResponse(userLanguage);
        if (answer != null){
            bot.sendMessage(chatId, answer);
        }else {
            bot.sendMessage(chatId,
                "Please provide a valid language preference. For example, 'set language english'.");
        }
    } else {
        bot.sendMessage(chatId, "Please provide a valid language preference. For example, 'set language english'.");
    }
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // Check if the message is not a command
    if (!msg.text.startsWith('/') && !msg.text.startsWith('set language')) {
        bot.sendMessage(chatId, "I'm sorry, I don't understand that command. " +
            "Send 'set language [language]' to set your preferred language.");
    }
});

// Handle other messages

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    // Check for valid int
    const number = parseInt(text, 10);
    if (!isNaN(number) && number >= 1 && number <= 101) {
        bot.sendMessage(chatId, QuoteHandler.getQuote(number).retValue);
    }
    else {
        // Not valid int in the specified range.
        bot.sendMessage(chatId, 'Please send an integer between 1 and 101');
    }
});




//
//
// // Init TextBot
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Welcome to the FridayAuraBot!' +
//         '\nHow can I assist you?\nPossible use cases:\n\/todo: for appending to a todolist\n\/idea: for random ideas\n\/thoughts: for deep thoughts\n\/blog: for adding blog titles\n\/showtodo: to show todolist\n\/done: to remove item from todolist\n\/showtitles to show all blog titles');
// });
//
// // Event listener
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;
//
//     // todo - Process the incoming message here
//     // for example:
//     if (messageText === '/start') {
//         bot.sendMessage(chatId, 'Welcome to the bot!');
//     }
//     else {
//         bot.sendMessage(chatId, messageText);
//     }
// });
//