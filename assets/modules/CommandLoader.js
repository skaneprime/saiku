const fs = require('fs');
require('colors');
function getFiles (dir, files_){
    var files = fs.readdirSync(dir);
    return files;
}
cln = __filename.toUpperCase().split('\\')[__filename.toUpperCase().split('\\').length-1].split('.')[0]
module.exports = (client) => {
    getFiles(__dirname + './../../commands').forEach(category => {
        let cst = `[${cln}] `.magenta + `[${category}] `.toUpperCase().cyan
        getFiles(__dirname + `./../../commands/${category}`).forEach(cmdName => {
            let CommandFile = require(__dirname + `./../../commands/${category}/${cmdName}`);
            if(!CommandFile) return console.log(cst + `SOMETHING BAD HAPPEN IN ${cmdName}!`.red);
            else {
                client.commands.set(CommandFile.name, CommandFile);
                console.log(cst + ` ${CommandFile.name} Loaded`.yellow);
            }
        })
    });
}