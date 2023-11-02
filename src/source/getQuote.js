const fs = require("fs");

const getQuote = (req) => {
    let quotesSrc;
    try {
        const stringQuotesSrc = fs.readFileSync(
            "server/models/chuck101.json");
        let quoteList = JSON.parse(stringQuotesSrc);
        const i = req.params.id;
        quotesSrc = quoteList[i]['quote'];
    } catch (err) {
        return {status: "failed", retValue: `error: ${err}`};
    }
    return {status: "succeed", retValue: quotesSrc};

};

module.exports = { getQuote };
