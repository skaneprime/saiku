module.exports = class Inventory {
    constructor(player_id) {
        this.player_id = player_id;
        this.items = []; // Предметы пользователя.
    };

    async add(itemid, count) { // Пушит или добавляет количествo предметoв в классе Инвентаря пользователя.
        if(!count || isNaN(count)) count = 1;
        if(count < 1) count = 0;
        let aitem = this.items.getItem(itemid);
        if(aitem.length < 1) {
            let Items = process.ItemList;
            this.items.push({ 
                id: itemid,
                count: count,
                name: Items.getItem(itemid).name || 'Unnamed',
                desc: Items.getItem(itemid).desc || 'No desc'
            });
        }
        else 
            this.items[this.items.indexOf(aitem[0])].count += count;
        this.update();
    };

    remove(itemid, count) { // Удаляет или уменшает количество предметов в классе Инвентаря пользователя.
        if(!count || isNaN(count)) count = 1;
        let aitem = this.items.getItem(itemid)[0];
        if(aitem.count - count > 0) 
            this.items[this.items.indexOf(aitem)].count -= count;
        else
            this.items.splice(this.items.indexOf(aitem), 1);
        this.update();
    };

    update() { // Превращает инвентарь в текст и Обновляет инвентарь игрока в базе данных.
        let invstr = '';
        let { con } = require('./../modules/Database'); 
        for(i = 0; i < this.items.length; i++) {
            invstr += this.items[i].id + ':' + this.items[i].count + (i === this.items.length-1 ? '' : ';');
            if(i === this.items.length-1) {
                //console.log('[DATABASE]'.cyan, `Player's inventory has been updated to ` + `${invstr}`.green);
                con.query(`UPDATE \`inventory\` SET items = '${invstr}' WHERE id = '${this.player_id}'`);
            };
        }
    };
};