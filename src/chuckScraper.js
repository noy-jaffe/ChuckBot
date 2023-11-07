
const axios = require('axios');
const cheerio = require("cheerio");
const fs = require("fs");


async function chuckScraper(number) {
    axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': 'DFJ5APHYWVKPUCX6GRJGXRLWTG1Q8SLRMZQMQZLQO447QEP8B3MFERO52748WHD5D62T0MPQISB032CG',
            'url': 'https://parade.com/968666/parade/chuck-norris-jokes/',
            // 'premium_proxy': 'true',
            'stealth_proxy': 'true',
        }
    }).then(function (response) {
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract quotes
        const quotes = [];
        $('ol').find('li')
            .each((index, element) => {
                quotes.push( $(element).text().trim());
            });


        // Check if the requested quote number is valid
        if (number > 0 && number < quotes.length) {
            return quotes[number-1];    
        }
        //todo else 
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}
module.exports = {chuckScraper};
