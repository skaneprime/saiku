require('colors');
const mysql = require('mysql');
const { Config, InventoryClass, PlayerClass } = require('../SaiKu');
var con = mysql.createConnection(Config.database);
console.log('[DATABASE]'.cyan, 'Creating connection..'.yellow);
module.exports = {
    connect: async () => con.connect((err) => {
        if(err) console.log('[DATABASE] '.cyan + `[ERROR] `.red, `${err}`);
        else console.log('[DATABASE] '.cyan + 'Connected'.green);
    }),
    
    getPlayer: function (id) {
        console.log('[DEBUG]'.grey,'Searching for player..');
        return new Promise(( resolve, reject ) => {
            let Player = new PlayerClass(id);
            con.query(`SELECT * FROM \`players\` WHERE id = '${id}'`, async (err, rows) => {
                if(err || rows.length < 1) {
                    console.log('[DEUBG]'.gray, 'This Player does not exist'.red);
                    return resolve(await this.CreatePlayer(id));
                }
                console.log('[DEBUG]'.grey,`Found`.green, `Player( id: ${id} )! Loading player\'s properties...`);
                Player.inventory = await getInventory(id);
                console.log('[DEBUG]'.grey,`Inventory of Player( id: ${id} )`, `Loaded!`.green);
                Player.powers = await getPowers(id);
                console.log('[DEBUG]'.grey,`Powers of Player( id: ${id} )`, `Loaded!`.green);
                return resolve(Player);
            });
        });
    },

    CreatePlayer: function (id) {
        console.log('[DEBUG]'.gray, 'Creating Player'.cyan);
        return new Promise(async (resolve, reject) => {
            await addPlayerToPlayersList(id);
            await createInventory(id);
            await createPowers(id);
            resolve(await this.getPlayer(id));
        });
    },

    updateItemList: () => new Promise(async (resolve, reject) => {
        console.log('[DATABASE]'.cyan, 'ItemList have been Updated!'.green);
        resolve(await require('./../functions/other/Items'));
    }),

    query: (sql, args) => {
        return new Promise( (resolve, reject) => {
            con.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                return resolve(rows);
            });
        });
    },

    con
};

function addPlayerToPlayersList(id) {
    return new Promise(async (resolve, reject) => {
        if(await checkExist(id, 'players')) return reject('This Player exist in PlayersList!');
        con.query(`INSERT INTO \`players\` (id) VALUES ('${id}')`, (err, result) => {
            if(err) return reject(err);
            console.log('[DEBUG]'.grey, `Player( id: ${id} ) have been added to PlayersList`.green);
            return resolve(result);
        });
    });
};

function createInventory(id) {
    return new Promise(async (resolve, reject) => {
        if(await checkExist(id, 'inventory')) return reject('This Player have an inventory!');
        con.query(`INSERT INTO \`inventory\` (id, items) VALUES ('${id}', '')`, (err, result) => {
            if(err) return reject(err);
            console.log('[DEBUG]'.grey, `Player( id: ${id} )'s Inventory has been created`.green);
            return resolve(result);
        })
    });
};

function createPowers(id) {
    return new Promise(async (resolve, reject) => {
        if(await checkExist(id, 'powers')) return reject('This Player have powers!');
        con.query(`INSERT INTO \`powers\` (id, powerlevel, ki, divine_ki) VALUES ('${id}', 0, 0, 0)`, (err, result) => {
            if(err) return reject(err);
            console.log('[DEBUG]'.grey, `Player( id: ${id} )'s powers has been created`.green);
            return resolve(result);
        });
    });
};

function checkExist(id, table) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM \`${table}\` WHERE id = '${id}'`, (err, rows) => {
            if(err || rows.length > 0) return reject(true);
            else resolve(false);
        });
    });
};

function getInventory(player_id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM \`inventory\` WHERE id = '${player_id}'`, async (err, rows) => {
            if(err) return reject(err);
            let Inventory = new InventoryClass(player_id);
            if(rows[0].length < 1 || rows[0].items.length < 1 ) return resolve(Inventory);
            let ItemsArr = rows[0].items.split(';');
            let ItemsList = process.ItemList;
            await ItemsArr.forEach(ItemData => {
                let Item = ItemsList.getItem(ItemData.split(':')[0]);
                if (!Item)
                    Item = { name: 'Unnamed', desc: 'No Desc' };
                Inventory.items.push({
                    id: ItemData.split(':')[0],
                    count: ItemData.split(':')[1] ? parseInt(ItemData.split(':')[1]) : 1,
                    name: Item.name,
                    desc: Item.desc
                });
            });
            return resolve(Inventory);
        });
    });
};

function getPowers(player_id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM \`powers\` WHERE id = '${player_id}'`, (err, rows) => {
            if(err) return reject(err);
            return resolve({
                ki: rows[0].ki,
                powerlevel: rows[0].powerlevel,
                divine_ki: rows[0].divine_ki
            });
        });
    });
};
