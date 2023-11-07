const axios = require('axios');
const cheerio = require("cheerio");

// const scrapingBeeApiKey = process.env.SCRAPINGBEE_API_KEY;
// const scrapingBeeApiKey = "H5UUQI2AN1JKGNKXGHVRTTGZSJ7MHFAT94ER8PBGR4YRZXV9H04CM73H7A4575YYYFBS905V6FFKLCSS";

async function chuckScraper() {
      const response = await axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': "H5UUQI2AN1JKGNKXGHVRTTGZSJ7MHFAT94ER8PBGR4YRZXV9H04CM73H7A4575YYYFBS905V6FFKLCSS",
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
