const fs = require("fs");

const getQuote = (req) => {
    let quotesSrc;
    try {

        const stringQuotesSrc = fs.readFileSync("C:/Users/noija/Desktop/projects/ChuckBot/src/quotes.json");
        let quoteList = JSON.parse(stringQuotesSrc);
        const i = req;
        quotesSrc = quoteList[i-1]['quote'];
    } catch (err) {
        return {status: "failed", retValue: `error: ${err}`};
    }
    return {status: "succeed", retValue: quotesSrc};

};
module.exports = { getQuote };
