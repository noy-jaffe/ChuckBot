
// Package
const TelegramBot = require('node-telegram-bot-api');

// Initialize the bot
const token = '6663098087:AAEsGkUdlZI121bvDh49nhh0q4w-Eq6PXGw';
const bot = new TelegramBot(token, { polling: true });


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Check for valid int
    const number = parseInt(text, 10);
    if (!isNaN(number) && number >= 1 && number <= 101) {
        bot.sendMessage(chatId, `You sent the number: ${number}`);
    } else {
        // Not valid int in the specified range.
        bot.sendMessage(chatId, 'Please send an integer between 1 and 101');
    }
});

















// Init TextBot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the FridayAuraBot!' +
        '\nHow can I assist you?\nPossible use cases:\n\/todo: for appending to a todolist\n\/idea: for random ideas\n\/thoughts: for deep thoughts\n\/blog: for adding blog titles\n\/showtodo: to show todolist\n\/done: to remove item from todolist\n\/showtitles to show all blog titles');
});

// Event listener
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // todo - Process the incoming message here
    // for example:
    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }
    else {
        bot.sendMessage(chatId, messageText);
    }
});

