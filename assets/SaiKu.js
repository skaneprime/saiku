const fs = require('fs');
function getFiles (dir, files_){
    var files = fs.readdirSync(dir);
    return files;
};

require('./structures/Guild');
require('./structures/Player');
let PlayerClass = require('./classes/Player');
let InventoryClass = require('./classes/Inventory');
let Client = require('./classes/Client');
let ModuleLoader = require('./ModuleLoader');
let Config = {
    client: require('./../config/client.json'),
    menu: require('./../config/menu/menu.json'),
    database: require('./../config/database')
};
function log(name, content) {
    console.log(`\n[${name}] => `.red, content);
    fs.appendFile(`./logs/errors/${name}.log`, `\n[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}] => ${content}\n`, (err) => {
        if(err) console.log(err);
    });
};

module.exports = {
    Client,
    PlayerClass,
    InventoryClass,
    ModuleLoader,
    Config,
    log
}