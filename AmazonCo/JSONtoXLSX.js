const XLSX = require('xlsx');
const fs = require('fs');
const clc = require("cli-color");

const info = clc.cyan.bold;
const success = clc.green.bold;

// read the JSON file
const jsonData = JSON.parse(fs.readFileSync('totals.json', 'utf8'));
console.log(info('(i) Collecting Data from JSON File...\n'));

// convert the JSON data to a worksheet
const worksheet = XLSX.utils.json_to_sheet(jsonData, { header: ['name', 'total'] });
console.log(info(`(i) Converting JSON to XLSX...\n`));

// create a new workbook and add the worksheet to it
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Brands');
console.log(info(`(i) Adding Rows to XLSX...\n`));


// write the workbook to an XLSX file
XLSX.writeFile(workbook, 'totals.xlsx');
console.log(success(`(✓) Saved XLSX File Successfully!\n`));
