
const SaiKu = require('./assets/SaiKu');
init().then((client) => {
    process.db.updateItemList();
    client.login('TokenOfSaiKu');
});

async function init () {
    return new Promise(async (resolve, reject) => {
        try {
            process.db = require('./assets/modules/Database');
            process.db.connect();
            process.client = new SaiKu.Client(SaiKu.Config.client);
            SaiKu.ModuleLoader(process.client);
            return resolve(process.client);
        } catch (err) {
            reject(err);
            return process.exit();
        };
    });
};