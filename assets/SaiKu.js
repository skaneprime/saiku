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

module.exports = {
    Client,
    PlayerClass,
    InventoryClass,
    ModuleLoader,
    Config
}