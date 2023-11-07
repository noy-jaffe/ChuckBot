const axios = require('axios');
const cheerio = require("cheerio");

// const scrapingBeeApiKey = process.env.SCRAPINGBEE_API_KEY;
const scrapingBeeApiKey = "GCCT3BGLWVM2B93E9MMMF96MEWFDP33YRRIEMNE4MCLGKRI9UPU85X2GIMYK5QBZG5ML6X32CUTO8608";

async function chuckScraper() {
      const response = await axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': scrapingBeeApiKey,
            'url': 'https://parade.com/968666/parade/chuck-norris-jokes/',
            'stealth_proxy': 'true',
        }
    })
        const html = response.data;
        const $ = cheerio.load(html);
        

        // Extract quotes
        const quotes = [];
        $('ol').find('li')
            .each((index, element) => {
                quotes.push( $(element).text().trim());
                
            });
        return quotes;

}

module.exports = {chuckScraper};
