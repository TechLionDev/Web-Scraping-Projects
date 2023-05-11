const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const urls = [
  // Women's Clothing
  'https://www.macys.com/shop/womens-clothing/all-womens-clothing?id=188851&cm_sp=us_hdr-_-women-_-188851_all-women%27s-clothing_COL1',
    // Junior's
  'https://www.macys.com/shop/junior-clothing/shop-all-juniors-apparel?id=60983&cm_sp=us_hdr-_-women-_-60983_all-juniors%27-clothing_COL2',
    // Plus Sizes
  'https://www.macys.com/shop/plus-size-clothing/all-plus-size-clothing?id=188853&cm_sp=us_hdr-_-women-_-188853_all-plus-size-clothing_COL2',
    // Petite
  'https://www.macys.com/shop/petite-clothing?id=18579&cm_sp=us_hdr-_-women-_-18579_petites-%285%274"-%26-under%29_COL2',
    // Maternity
  'https://www.macys.com/shop/womens-clothing/maternity-clothes?id=66718&cm_sp=us_hdr-_-women-_-66718_maternity_COL2',
  // Women's Shoes
  'https://www.macys.com/shop/shoes/all-womens-shoes?id=56233&cm_sp=us_hdr-_-women-_-56233_shoes_COL3',
  // Handbags
  'https://www.macys.com/shop/handbags-accessories/all-handbags-wallets?id=203051&cm_sp=us_hdr-_-women-_-203051_handbags-%26-wallets_COL3',
  // Accessories
  'https://www.macys.com/shop/handbags-accessories/accessories?id=29440&cm_sp=us_hdr-_-women-_-29440_accessories_COL3',
  // Tights, Socks, & Hosiery
  'https://www.macys.com/shop/womens-clothing/socks-tights?id=40546&cm_sp=us_hdr-_-women-_-40546_tights%2C-socks%2C-%26-hosiery_COL3',
  // MakeUp
  'https://www.macys.com/shop/makeup-and-perfume/makeup?id=30077&cm_sp=us_hdr-_-women-_-30077_makeup_COL3',
  // Perfume
  'https://www.macys.com/shop/makeup-and-perfume/perfume?id=30087&cm_sp=us_hdr-_-women-_-30087_perfume_COL3',
  // Men's Clothing
  'https://www.macys.com/shop/mens-clothing/all-mens-clothing?id=197651&cm_sp=us_hdr-_-men-_-197651_all-men%27s-clothing_COL1',
  // Activewear
  'https://www.macys.com/shop/mens-clothing/mens-activewear?id=3296&cm_sp=us_hdr-_-men-_-3296_all-activewear_COL2',
  // Big & Tall
  'https://www.macys.com/shop/mens-clothing/big-and-tall?id=45758&cm_sp=us_hdr-_-men-_-45758_all-big-%26-tall_COL2',
  // Shoes
  'https://www.macys.com/shop/mens-clothing/shop-all-mens-shoes?id=55822&cm_sp=us_hdr-_-men-_-55822_all-men%27s-shoes_COL3',
  // Accessories
  'https://www.macys.com/shop/mens-clothing/mens-accessories?id=47665&cm_sp=us_hdr-_-men-_-47665_all-accessories_COL3',
  // Cologne
  'https://www.macys.com/shop/makeup-and-perfume/cologne-for-men?id=30088&cm_sp=us_hdr-_-men-_-30088_all-cologne_COL3',
  // Baby
  'https://www.macys.com/shop/kids-clothes/baby-products?id=187458&cm_sp=us_hdr-_-kids-_-187458_all-baby_COL1',
  // Girls
  'https://www.macys.com/shop/kids-clothes/girls-clothing?id=61998&cm_sp=us_hdr-_-kids-_-61998_all-girls_COL1',
  // Boys
  'https://www.macys.com/shop/kids-clothes/boys-clothing?id=61999&cm_sp=us_hdr-_-kids-_-61999_all-boys_COL1',
  // Toys
  'https://www.macys.com/shop/all-toys/all-toys?id=45269&cm_sp=us_hdr-_-kids-_-all-toys_COL4',
  // Bedding
  'https://www.macys.com/shop/bed-bath/all-bedding?id=20919&cm_sp=us_hdr-_-home-_-20919_all-bedding_COL1',
  // Bath
  'https://www.macys.com/shop/bed-bath/shower-accessories?id=8237&cm_sp=us_hdr-_-home-_-8237_all-bath_COL1',
  // Cleaning
  'https://www.macys.com/shop/for-the-home/all-cleaning-organization?id=206361&cm_sp=us_hdr-_-home-_-206361_all-cleaning-%26-organization_COL1',
  // Kitchen
  'https://www.macys.com/shop/kitchen/all-kitchen?id=291559&edge=hybrid',
  // Luggage
  'https://www.macys.com/shop/luggage/all-luggage?id=76877&edge=hybrid',
  // Dining
  'https://www.macys.com/shop/dining-entertaining/all-dining?id=245256&edge=hybrid',
  // Home Decor
  'https://www.macys.com/shop/all-home-decor/all-home-decor?id=290059&edge=hybrid',
  // Skin Care
  'https://www.macys.com/shop/makeup-and-perfume/skin-care?id=30078&cm_sp=us_hdr-_-beauty-_-30078_all-skin-care_COL2',
  // Hair Care
  'https://www.macys.com/shop/makeup-and-perfume/all-hair-care?id=60600&cm_sp=us_hdr-_-beauty-_-60600_all-hair-care_COL2',
  // Fine Jewlery
  'https://www.macys.com/shop/jewelry-watches/all-fine-jewelry?id=65993&cm_sp=us_hdr-_-jewelry-_-65993_all-fine-jewelry_COL1',
  // Wedding Jewlery
  'https://www.macys.com/shop/jewelry-watches/all-wedding-jewelry?id=77998&cm_sp=us_hdr-_-jewelry-_-77998_all-wedding-jewelry_COL1',
  // Fashion Jewlery
  'https://www.macys.com/shop/jewelry-watches/all-fashion-jewelry?id=55352&cm_sp=us_hdr-_-jewelry-_-55352_all-fashion-jewelry_COL2',
  // Mens Jewlery
  'https://www.macys.com/shop/jewelry-watches/mens-jewelry-accessories?id=43877&cm_sp=us_hdr-_-jewelry-_-43877_men%27s-jewelry-%26-cufflinks_COL2',
  // Watches
  'https://www.macys.com/shop/jewelry-watches/all-watches?id=239616&cm_sp=us_hdr-_-jewelry-_-239616_all-watches_COL2',
  // Living Room
  'https://www.macys.com/shop/furniture/living-room-furniture?id=35319&cm_sp=us_hdr-_-furniture-_-35319_all-living-room_COL1',
  // Dining Room
  'https://www.macys.com/shop/furniture/dining-room-furniture?id=35421&cm_sp=us_hdr-_-furniture-_-35421_all-dining-room-%26-kitchen_COL1',
  // Bedroom
  'https://www.macys.com/shop/furniture/bedroom-furniture-sets?id=35420&cm_sp=us_hdr-_-furniture-_-35420_all-bedroom_COL2',
  // Matresses
  'https://www.macys.com/shop/mattress/all-mattresses?id=97743&edge=hybrid',
  // Outdoor 
  'https://www.macys.com/shop/furniture/outdoor-patio-furniture?id=70056&edge=hybrid',
  // Home Office
  'https://www.macys.com/shop/furniture/home-office-furniture?id=35422&cm_sp=us_hdr-_-furniture-_-35422_all-home-office_COL3',
  // Entryway
  'https://www.macys.com/shop/furniture/entryway-furniture?id=69963&cm_sp=us_hdr-_-furniture-_-69963_all-entryway_COL3',
  // Rugs
  'https://www.macys.com/shop/area-rugs/all-area-rugs?id=190877&edge=hybrid'
]

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

const productLinks = [];

async function main() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await crawl(url);
  }
}

async function crawl(url) {
  try {
    await axios.get(url.split('?')[0] + '/Productsperpage/120' + '?' + url.split('?')[1], {
      'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
    }).then(async (response) => {
      const $ = cheerio.load(response.data);
      const productCategory = $('.breadcrumb-current').text().trim();
      const lastOption = $('select[name="dropdown"] option:last-child').text();
      const totalPages = parseInt(lastOption.split(' ')[2]);
      if (totalPages == NaN) {
        totalPages = 1;
      }
      for (let i = 1; i <= totalPages; i++) {
        console.log(`Crawling page ${i}/${totalPages} in ${productCategory}`);
        await crawlPage(url.split('?')[0] + `/Pageindex,Productsperpage/${i},120` + '?' + url.split('?')[1]);
      }
      fs.writeFile('products.json', JSON.stringify(productLinks), (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Product links saved to products.json');
        }
      });
    })
  } catch (error) {

  }
}

async function crawlPage(url) {
  try {
    await axios.get(url, {
      'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
    }).then(async (response) => {
      const $ = cheerio.load(response.data);
      $('.productThumbnail').each((index, element) => {
        const productLink = $(element).find('a').attr('href');
        const productName = $(element).find('a').attr('title').trim();
        const productPrice = $(element).find('.priceInfo').text().trim();
        const productRating = $(element).find('.stars').attr('aria-label')?.trim();
        const productBrand = $(element).find('.productBrand').text().trim();
        const productImage = $(element).find('img').attr('data-lazysrc');
        const productCategory = $('.breadcrumb-current').text().trim();
        productLinks.push({
          name: productName,
          url: 'https://www.macys.com' + productLink,
          price: productPrice,
          rating: productRating,
          brand: productBrand,
          image: productImage,
          category: productCategory,
        });
      })
    })
  } catch (error) {
    console.log(`Failed To Crawl ${url}`);
  }
}

main();