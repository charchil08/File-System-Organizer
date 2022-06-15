const fs = require('fs');
const path = require('path');
const types = require("../utility/extension").typesKey;

const getCategory = (fileName) => {
    const extension = path.extname(fileName).slice(1);

    for (let type in types) {
        let currentCategoryArray = types[type];
        for (let index in currentCategoryArray) {
            if (extension == currentCategoryArray[index]) {
                return type;
            }
        }
    }
    return "others";
}

// Send files from src to destionation and delete srcFiles 
const sendFiles = (srcFilePath, destinatinPath, category) => {

    const categoryPath = path.join(destinatinPath, category);

    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
    }

    const fileName = path.basename(srcFilePath);
    const destinatinFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destinatinFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(` 👉 ${fileName} ---> ${category}`)
}

//3. Identify category of all the files in that directory
const organizeHelper = (dirPath, destinatinPath) => {

    // return array of all dir & files in dirPath
    const childrenName = fs.readdirSync(dirPath);

    // travel all children and find out all files
    childrenName.forEach((childName, index) => {
        const childAddress = path.join(dirPath, childName);

        // used to check weather it is a file or not
        const isChildFile = fs.lstatSync(childAddress).isFile()

        //4. Copy / cut files to that organized directory inside anyone of category folder
        if (isChildFile) {
            const category = getCategory(childName)
            // TODO: cut/copy/paste function
            sendFiles(childAddress, destinatinPath, category);
        }
    })
}

const organizeFn = (dirPath) => {
    // TODO: 1. Directory path given -> input -> dirPath
    // TODO: 2. create -> organized_files directory
    // TODO: 3. Identify category of all the files in that directory
    // TODO: 4. Copy / cut files to that organized directory inside anyone of category folder
    let destinatinPath;

    if (dirPath === undefined) {
        dirPath = process.cwd();
    }


    // If path exist using existSync() function
    const doesExist = fs.existsSync(dirPath);
    if (doesExist === true) {
        // TODO: 2. create -> organized_files directory
        destinatinPath = path.join(dirPath, "organized_files")

        // Make a folder only when it does not exists.
        try {
            if (!fs.existsSync(destinatinPath))
                fs.mkdirSync(destinatinPath);
        } catch (e) {
            console.log('Folder already created')
        }
    } else {
        console.log(' 🛑 Kindly enter valid path ')
        return;
    }

    organizeHelper(dirPath, destinatinPath)
}

module.exports = {
    organizeKey: organizeFn
}