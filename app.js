#!/usr/bin/env node

const fs = require('fs');
const path = require('path')

const helpObj = require("./commands/help");
const organizeObj = require("./commands/organize");
const treeObj = require("./commands/tree");

const types = require("./utility/extension")

// node app.js tree path
// node app.js organize path
// node app.js help


// Driver code
const inputArr = process.argv.slice(2);
// console.log(inputArr);

// inputArr[0] -> command
// inputArr[1] -> Directory path


const command = inputArr[0];

switch (command) {
    case 'tree':
        treeObj.treeKey(inputArr[1]);
        break;
    case 'organize':
        organizeObj.organizeKey(inputArr[1])
        break;
    case 'help':
        helpObj.helpKey();
        break;
    default:
        console.log('Please enter valid command 🙄🙄');
}