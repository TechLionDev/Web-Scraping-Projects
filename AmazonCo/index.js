const axios = require('axios');
const cheerio = require('cheerio');

let userAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4_9; like Mac OS X) AppleWebKit/603.33 (KHTML, like Gecko)  Chrome/52.0.2211.318 Mobile Safari/603.3',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_5; like Mac OS X) AppleWebKit/600.11 (KHTML, like Gecko)  Chrome/53.0.1798.111 Mobile Safari/602.3',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3_5; like Mac OS X) AppleWebKit/533.19 (KHTML, like Gecko)  Chrome/47.0.3405.115 Mobile Safari/600.3',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_2; like Mac OS X) AppleWebKit/600.19 (KHTML, like Gecko)  Chrome/55.0.2474.286 Mobile Safari/600.3',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_4; like Mac OS X) AppleWebKit/534.2 (KHTML, like Gecko)  Chrome/55.0.2756.363 Mobile Safari/534.8',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1; like Mac OS X) AppleWebKit/536.29 (KHTML, like Gecko)  Chrome/51.0.2499.274 Mobile Safari/601.6',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3_7; like Mac OS X) AppleWebKit/603.13 (KHTML, like Gecko)  Chrome/49.0.1540.369 Mobile Safari/534.5',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_7_9; like Mac OS X) AppleWebKit/535.27 (KHTML, like Gecko)  Chrome/47.0.3434.201 Mobile Safari/600.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_9_5; like Mac OS X) AppleWebKit/537.7 (KHTML, like Gecko)  Chrome/48.0.3471.336 Mobile Safari/535.8',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_5; like Mac OS X) AppleWebKit/537.37 (KHTML, like Gecko)  Chrome/52.0.3957.289 Mobile Safari/602.7',
    'Mozilla/5.0 (Linux; U; Android 7.1; Nexus 5P Build/NME91E) AppleWebKit/603.40 (KHTML, like Gecko)  Chrome/50.0.3195.222 Mobile Safari/601.4',
    'Mozilla/5.0 (Android; Android 6.0.1; SAMSUNG SM-G9350I Build/MMB29V) AppleWebKit/600.24 (KHTML, like Gecko)  Chrome/50.0.1679.388 Mobile Safari/536.8',
    'Mozilla/5.0 (Linux; Android 5.0; SAMSUNG SM-G925H Build/KOT49H) AppleWebKit/603.39 (KHTML, like Gecko)  Chrome/50.0.3440.391 Mobile Safari/602.2',
    'Mozilla/5.0 (Linux; Android 5.0; SAMSUNG SM-T815 Build/LRX22G) AppleWebKit/537.22 (KHTML, like Gecko)  Chrome/53.0.3656.383 Mobile Safari/601.6',
    'Mozilla/5.0 (Android; Android 4.4.1; [HM NOTE|NOTE-III|NOTE2 1LTETD) AppleWebKit/535.23 (KHTML, like Gecko)  Chrome/52.0.2059.349 Mobile Safari/600.9',
    'Mozilla/5.0 (Linux; Android 5.0.2; HTC [M8|M9|M8 Pro Build/LRX22G) AppleWebKit/602.12 (KHTML, like Gecko)  Chrome/49.0.1346.194 Mobile Safari/601.2',
    'Mozilla/5.0 (Linux; U; Android 5.1.1; SAMSUNG SM-G9350I Build/MMB29M) AppleWebKit/602.11 (KHTML, like Gecko)  Chrome/51.0.1388.230 Mobile Safari/603.0',
    'Mozilla/5.0 (Linux; U; Android 7.0; SAMSUNG GT-I9600 Build/KTU84P) AppleWebKit/533.50 (KHTML, like Gecko)  Chrome/50.0.2340.326 Mobile Safari/536.0',
    'Mozilla/5.0 (Linux; Android 5.1.1; XT1021 Build/LPH223) AppleWebKit/601.9 (KHTML, like Gecko)  Chrome/47.0.1562.162 Mobile Safari/602.2',
    'Mozilla/5.0 (Linux; U; Android 5.1; Nexus 5 Build/LRX22C) AppleWebKit/533.18 (KHTML, like Gecko)  Chrome/48.0.1192.230 Mobile Safari/534.3',
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 8_1_3; en-US) AppleWebKit/535.18 (KHTML, like Gecko) Chrome/51.0.3173.135 Safari/535',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_8) Gecko/20100101 Firefox/65.6', 'Mozilla/5.0 (Windows; U; Windows NT 6.0; Win64; x64) AppleWebKit/602.31 (KHTML, like Gecko) Chrome/53.0.1684.108 Safari/601',
    'Mozilla/5.0 (Linux i564 x86_64; en-US) AppleWebKit/603.39 (KHTML, like Gecko) Chrome/52.0.1526.332 Safari/535',
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_12_9) Gecko/20100101 Firefox/71.1', 'Mozilla/5.0 (U; Linux x86_64; en-US) Gecko/20130401 Firefox/68.3',
    'Mozilla/5.0 (Linux i563 ) Gecko/20100101 Firefox/66.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 9_3_8; en-US) AppleWebKit/534.49 (KHTML, like Gecko) Chrome/50.0.1622.239 Safari/533',
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 9_7_7; en-US) Gecko/20130401 Firefox/56.1', 'Mozilla/5.0 (Linux; Linux i553 ) Gecko/20100101 Firefox/57.2', 'Mozilla/5.0 (Linux; Linux x86_64) Gecko/20130401 Firefox/74.7',
    'Mozilla/5.0 (Windows; Windows NT 10.1; Win64; x64) Gecko/20130401 Firefox/65.0', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/533.23 (KHTML, like Gecko) Chrome/48.0.1997.250 Safari/537',
    'Mozilla / 5.0(compatible; MSIE 9.0; Windows; Windows NT 10.1; x64; en - US Trident / 5.0) ',
    'Mozilla / 5.0(Windows NT 10.5;; en - US) AppleWebKit / 600.12(KHTML, like Gecko) Chrome / 55.0.1770.321 Safari / 534',
    'Mozilla / 5.0(compatible; MSIE 10.0; Windows; Windows NT 6.3; WOW64 Trident / 6.0) ',
    'Mozilla / 5.0(Linux; U; Linux x86_64; en - US) AppleWebKit / 536.32(KHTML, like Gecko) Chrome / 47.0.2496.375 Safari / 602',
    'Mozilla / 5.0(Linux i656 x86_64) AppleWebKit / 533.16(KHTML, like Gecko) Chrome / 51.0.2973.394 Safari / 534',
    'Mozilla / 5.0(U; Linux x86_64; en - US) AppleWebKit / 536.39(KHTML, like Gecko) Chrome / 51.0.3171.157 Safari / 600',
    'Mozilla / 5.0(compatible; MSIE 9.0; Windows; Windows NT 10.3; Win64; x64; en - US Trident / 5.0) '
];
let brandsWithTotal = [];
async function main() {
    let brands = await axios.get('https://script.google.com/macros/s/AKfycbyehbn2Ly5-PlqQ0bju8HgOGibO2XsSPE8dTA1c78WkiaiROhVWJtNdRX28H5iaAIvS/exec').then(res => res.data.brands);
    let newBrands = [];
    for (let brandInx = 0; brandInx < brands.length; brandInx++) {
        if (newBrands.indexOf(brands[brandInx][0]) === -1) {
            newBrands.push(brands[brandInx][0]);
        }
    }
    for (let brand of newBrands) {
        let encodedParam = encodeURIComponent(brand);
        let url = `https://amazon.com/s?k=${encodedParam}`;
        try {
            console.log(`Attempting to crawl ${brand}`);
            await crawl(url, brand);
        } catch (error) {
            console.log(`Failed to crawl ${brand}, Trying again...`);
            await crawl(url, brand);
        }
        console.log(`Attempting to save ${brand} to Sheet`);
            await axios.post('https://script.google.com/macros/s/AKfycbyehbn2Ly5-PlqQ0bju8HgOGibO2XsSPE8dTA1c78WkiaiROhVWJtNdRX28H5iaAIvS/exec', {
            brands: brandsWithTotal
        })
    }

}

async function crawl(url, brand) {
    let productURLs = [];
    await axios.get(url, {
        'headers': {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
        },
        timeout: 30000
    }).then(async res => {
        let $ = cheerio.load(res.data);
        $('div[data-component-type="s-search-result"]').each(async (i, el) => {
            let productURL = $(el).find('a:first').attr('href');
            productURLs.push('https://www.amazon.com' + productURL);
        });
        let productPage = productURLs[Math.floor(Math.random() * productURLs.length)];
        do {
            productPage = productURLs[Math.floor(Math.random() * productURLs.length)];
        } while (productPage === undefined || productPage === null || productPage.includes('picassoRedirect'));
        await crawlProductPage(productPage, brand, url);

    }).catch(err => {

    })
}

async function crawlProductPage(url, brand, prevLink) {
    await axios.get(url, {
        'headers': {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
        },
        timeout: 30000
    }).then(async res => {
        const $ = await cheerio.load(res.data);
        let storeFrontURL = 'https://www.amazon.com' + $('a[id="sellerProfileTriggerId"]').attr('href');
        if (storeFrontURL.includes('undefined')) {
            await crawl(prevLink, brand);
        }
        await getStoreFrontLandingPage( storeFrontURL, brand, url);
    }).catch(err => {

    })
}


async function getStoreFrontLandingPage(storeFrontURL, brand, prevLink) {
    await axios.get(storeFrontURL, {
        'headers': {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
        },
        timeout: 30000
    }).then(async res => {
        const $ = await cheerio.load(res.data);
        let finalPage = 'https://www.amazon.com' + $('span[data-action="spp-page-link-action"] > a').attr('href');
        if (finalPage.includes('undefined')) {
            await crawlProductPage(prevLink, brand);
        }
        await getTotalNumberOfProducts(finalPage, brand);
    })
}

async function getTotalNumberOfProducts(finalPage, brand) {
    try {
        await axios.get(finalPage, {
            'headers': {
                'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
            },
        }).then(async res => {
            const $ = await cheerio.load(res.data);
            let resultsText = $('div.a-section.a-spacing-small.a-spacing-top-small').text();
            let regex1 = /(\d+,?\d+) results/
            let results = resultsText.match(regex1);
            if (results[1] === null) {
                await getTotalNumberOfProducts(finalPage, brand);
            }
            if (results[1] === undefined) {
                await crawlProductPage(finalPage, brand);
            }
            if (results[1] === '') {
                await crawlProductPage(finalPage, brand);
            }
            console.log(`---------------------------------------------`);
            console.log(`Found ${results[1]} Products Sold By ${brand}`);
            console.log(`---------------------------------------------`);
            brandsWithTotal.push({
                name: brand,
                total: results[1]
            });
        })
    }
    catch (err) {
        await axios.get(finalPage, {
            'headers': {
                'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
            },
        }).then(async res => {
            const $ = await cheerio.load(res.data);
            let resultsText = $('div.a-section.a-spacing-small.a-spacing-top-small').text();
            let regex1 = /(\d+,?\d+) results/
            let results = resultsText.match(regex1);
            console.log(`---------------------------------------------`);
            console.log(`Found ${results[1]} Products Sold By ${brand}`);
            console.log(`---------------------------------------------`);
            brandsWithTotal.push({
                name: brand,
                total: results[1]
            });
        })
    }
}

main();