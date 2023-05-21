#!/bin/bash
clear && node --max-old-space-size=12288 saveToJSON.js && node --max-old-space-size=12288 JSONtoXLSX.js