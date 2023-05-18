@echo off

node "--max-old-space-size=16384" "saveToJSON.js" && node "--max-old-space-size=16384" "JSONtoXLSX.js"

pause