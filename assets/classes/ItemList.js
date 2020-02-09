module.exports = class ItemList {
    constructor(ItemData) {
        ItemData.forEach(Item => {
            this[Item.id] = { 
                id: Item.id,
                name: Item.name,
                desc: Item.desc 
            };
        });
    };

    getItem(id) {
        return this[id] || null;
    };

    getItemBool(id) {
        if(this[id]) return true;
        else return false;
    };

    createItem(id, props) {
        return new Promise(async (resolve, reject) => {
            if(process.ItemList.getItemBool(id)) {
                console.log('[DEBUG]'.gray, '[ITEMLIST] createItem:'.yellow,'That Item Exist! switching to'.red, `updateItem()`.yellow);
                return resolve(this.updateItem(id, props));
            };
            console.log('[DEBUG]'.gray, 'Creating new Item...')
            process.db.con.query(`INSERT INTO \`items\` (\`id\`, \`name\`, \`desc\`) VALUES ('${id}', '${props.name || 'Unnamed'}', '${props.desc || 'No desc'}')`, (err, rows) => {
                if(err) return reject(err);
                this.updateList().then(ItemList => {
                    return resolve(ItemList.getItem(id));
                });
            });
        });
    };

    updateItem(id, props) {
        return new Promise((resolve, reject) => {
            if(!process.ItemList.getItemBool(id)) {
                console.log('[DEBUG]'.gray, '[ITEMLIST] updateItem:'.yellow,'That Item doesn\'t Exist! switching to'.red, `createItem()`.yellow);
                return resolve(this.createItem(id, props));
            };
            console.log('[DEBUG]'.gray, 'Updating Item...'.yellow)
            process.db.con.query(`UPDATE \`items\` SET \`id\`='${props.id ? props.id : id}', \`name\`='${props.name}', \`desc\`='${props.desc}' WHERE id='${id}' `, async (err, result) => {
                if(err) return reject(err);
                this.updateList().then(ItemList => {
                    return resolve(ItemList.getItem(id));
                });
            });
        });
    };
    
    deleteItem(id) {
        return new Promise((resolve, reject) => {
            if(!process.ItemList.getItem(id)) return reject('This Item Does not exist');
            console.log('[DEBUG]'.gray, 'Deleting Item...'.yellow)
            process.db.query(`DELETE FROM \`items\` WHERE id='${id}'`, (err, result) => {
                if(err) return reject(err);
                else this.updateList().then(ItemList => { return resolve('DeletedItem') });
            });
        });
    };
    
    updateList() {
        return new Promise((resolve, reject) => {
            console.log('[DEBUG]'.gray, 'ItemList Updated'.green);
            process.db.con.query(`SELECT * FROM \`items\``, (err, rows) => {
                if(err) return reject(err);
                process.ItemList = new ItemList(rows);
                return resolve(process.ItemList);
            });
        });
    };

};