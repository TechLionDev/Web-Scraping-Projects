# 🕸️ Web Scrapers

This repository contains a collection of web scrapers organized by folder, each containing a scraper for a different e-commerce website or service.

Note: All scrapers in this repository were created using Node.js, Axios, and Cheerio.

## 📂 List of Folders and Their Contents

- **/Macy's:** All URLs in Code
- **/BestBuy:** All URLs in Code
- **/Amazon:** Need to add your own URLs
- **/AmazonCo:** Automatic for each company/Storefront. Must Use following run command so no crash:

```
node --max-old-space-size=8192 index.js
```

## 🚀 Getting Started

To use these web scrapers, you'll need to have Node.js installed on your computer. Clone this repository and navigate to the folder containing the scraper you want to use. Install the required Node.js packages listed in the `package.json` file by running the following command in your terminal:

```sh
yarn install
```

Once the required packages are installed, you can run the scraper by executing the following command in your terminal:

```sh
node scraper.js
```

Note: Replace `scraper.js` with the name of the scraper file in the folder you want to use.

## 🤝 Contributing

We welcome contributions to this repository! To contribute, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix: `git checkout -b new-feature`.
3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your fork: `git push origin new-feature`.
5. Submit a pull request to this repository.

Please ensure that your code is properly formatted, and works as expected before submitting a pull request.

## 📄 License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.

Happy scraping!
