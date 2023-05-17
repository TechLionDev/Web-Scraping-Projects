const XLSX = require('xlsx');
const fs = require('fs');

// read the JSON file
const jsonData = JSON.parse(fs.readFileSync('totals.json', 'utf8'));

// convert the JSON data to a worksheet
const worksheet = XLSX.utils.json_to_sheet(jsonData, {header: ['name', 'total']});

// create a new workbook and add the worksheet to it
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// write the workbook to an XLSX file
XLSX.writeFile(workbook, 'totals.xlsx');
