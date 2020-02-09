let ItemList = require('./../../classes/ItemList');
module.exports = new Promise((res, rej) => {
    let { con } = require('./../../modules/Database');
    con.query(`SELECT * FROM \`items\``, (err, rows) => {
        if(err !== null) return rej(err);
        process.ItemList = new ItemList(rows);
        return res(process.ItemList);
    });
});