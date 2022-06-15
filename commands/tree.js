const fs = require('fs');
const path = require('path');

const treeHelper = (dirPath, indent) => {

    // check if dirPath is file or foler
    const isFile = fs.lstatSync(dirPath).isFile();

    // if dirPath is file
    if (isFile === true) {
        const fileName = path.basename(dirPath);
        console.log(`${indent} |-- ${fileName}`);
    }
    // else it will be a folder
    else {
        const folderName = path.basename(dirPath);
        console.log(`${indent} |__  ${folderName}`)
        const children = fs.readdirSync(dirPath);

        children.forEach((child, index) => {
            let childPath = path.join(dirPath, child);
            treeHelper(childPath, indent + "\t");
        })

    }

}

const treeFn = (dirPath) => {

    // if path is not valid then show it on current working directory
    if (dirPath === undefined || dirPath === null) {
        treeHelper(process.cwd(), "");
        return;
    }

    const doesExist = fs.existsSync(dirPath);

    if (doesExist === true) {
        treeHelper(dirPath, "");
    } else {
        console.log(' 🛑 Kindly Enter path');
        return;
    }
}

module.exports = {
    treeKey: treeFn
}