const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://parade.com/968666/parade/chuck-norris-jokes/';

// const proxy = {
//     protocol: 'http',
//     host: '146.59.202.70', // Free proxy from the list
//     port: 80,
// };
const header = {
    Host: 'parade.com',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,' +
        'application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' +
        ' (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.76',
}


async function scrapeJokes() {
    try {
        // Send an HTTP GET request to the webpage
        const {response }= await axios.get(url, {
            headers: {header}
        });

        // Check if the request was successful
        if (response.status === 200) {
            // Load the HTML content using cheerio
            const $ = cheerio.load(response.data);

            // Select the <ol> element
            const ol = $('ol');

            // Iterate through the <li> elements within the <ol>
            ol.find('li').each((index, element) => {
                const listItemText = $(element).text();
                console.log(listItemText);
            });
            // Extract Chuck Norris jokes
            const jokes = [];
            $('title').each((index, element) => {
                const joke = $(element).text();
                jokes.push(joke);
            });

            // Filter out jokes
            const validJokes = jokes.filter((joke) => joke.trim().length > 0);

            // Print the jokes to the console
            validJokes.forEach((joke, index) => {
                console.log(`Joke ${index + 1}: ${joke}`);
            });
        } else {
            console.error(`Failed to fetch the webpage (Status Code: ${response.status})`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

scrapeJokes();

