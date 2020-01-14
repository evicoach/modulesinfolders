const fs = require('fs');
const path = require('path');

// get the first argument pass to the app
// the folder location
const dirPath = process.argv.slice(2)[0];

let dirName = '';

const getDirectoryName = (file) => {
    let hiphen = file.indexOf('-0');
    if (hiphen < 0)
        hiphen = file.indexOf('-1');

    if (hiphen < 0)
        hiphen = file.indexOf('-2');


    if (hiphen > 0)
        dirName = path.join(dirPath, file.substring(0, hiphen));


    return dirName; // eg /basics
}

const getDestination = (file) => {
    return path.join(getDirectoryName(file), file);
}

//moves the $file to $dir2
const moveFile = (file, dest) => {

    //gets file name and adds it to dir2
    // var f = path.basename(file);
    // var dest = path.resolve(dir2, f);

    fs.open(dest, (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                return;
            }
            fs.rename(file, dest, (err) => {
                if (err) throw err;
                else console.log('Successfully moved');
            });
        } else return console.log('Nothing was moved');
    })
};

const createFolder = (directoryName) => {

    // check if folder exist
    // if not create it
    return fs.open(directoryName, (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                return;
            }
            fs.mkdir(directoryName, (err) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        return;
                    }
                    console.log('Error creating folder:', err);
                    throw err;
                }
            })
        } else return console.log('No folders were created')
    })
}

// read and list all the files in this folder
fs.readdir(dirPath, (err, file) => {
    if (err) {
        console.log('Unable to scan directory:', err);
    }

    // use one forEach loop to create all the needed directories
    file.forEach((file) => {
        let stat = fs.lstatSync(path.join(dirPath, file));
        if (stat.isDirectory()) return; // return if there are no files
        let obj = { name: file }
        let obj2 = { ...obj }
        let dirName = getDirectoryName(obj2.name);

        // create module folders
        createFolder(dirName);
    });

    // use another forEach loop to move all the files into it's module directory
    file.forEach((file) => {
        let stat = fs.lstatSync(path.join(dirPath, file));
        if (stat.isDirectory()) return;
        moveFile(path.join(dirPath, file), getDestination(file))
    })
});