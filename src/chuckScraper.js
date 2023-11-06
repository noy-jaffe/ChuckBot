
const axios = require('axios');
const cheerio = require("cheerio");
const fs = require("fs");


async function chuckScraper() {
    axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': 'VB969R3KEZOTQC6P16VJ707M4QW1EECJPVA8DR2G7LI2TNIE0RA63GB7KYKK0Q5LP5WSNBK96RD477YS',
            'url': 'https://parade.com/968666/parade/chuck-norris-jokes/',
            'stealth_proxy': 'true',
        }
    }).then(function (response) {
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract quotes
        const quotes = [];
        $('ol').find('li')
            .each((index, element) => {
                quotes.push({
                    id: index + 1,
                    quote: $(element).text().trim(),
                });
            });

        // Save quotes
        fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2));
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}
module.exports = {chuckScraper};