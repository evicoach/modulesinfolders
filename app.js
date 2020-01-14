const fs = require('fs');
const path = require('path');

const dirPath = '/media/evi/UBUNTU 19_1/Tutorials/NodeJS';

const getHyphen = (file) => {
    let hiphen = file.indexOf('-0');
    if (hiphen < 0)
        hiphen = file.indexOf('-1');

    if (hiphen < 0)
        hiphen = file.indexOf('-2');


    return hiphen;
}

fs.readdir(dirPath, (err, file) => {
    if (err) {
        return console.log('Unable to scan directory ' + err);
    }

    // listing all files using forEach
    file.forEach(file => {
        // for each file, let the dir name be
        let hiphen = getHyphen(file);

        // if found, ie, hiphen is greater than zero
        if (hiphen > 0) {
            let dirName = file.substring(0, hiphen);
            console.log(dirName);

        }
    });
});