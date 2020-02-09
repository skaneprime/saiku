const Discord = require('discord.js');
const { Config } = require('./../../assets/SaiKu');
const MenuConfig = Config.menu;
module.exports = {
    name: 'fight',
    aliases: '',
    guildonly: true,
    usage: '',
    devonly: false,
    blacklist: [''],
    run: async (client, message, args) => {
        var BattleData = { 
            enemy: {
                name: "ULTRA INSTINCT"
            }, 
            finished: false, 
            move: 1 
        };
        let FightEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .addField(`You`, `Info`)
        .addField(BattleData.enemy.name, `Info`)
        .setFooter('Ход ' + BattleData.move)
        let FightMsg = await message.channel.send(FightEmbed);
        var oldReactionsIDList = [];
        await MenuConfig.forEach(async data => {
            oldReactionsIDList.push(data.teID);
            await FightMsg.react(data.teID);
        });
        console.log("[DEBUG] ".cyan + "Battle Start")
        Move();
        function Move() {
            const filter = (reaction, user) => user.id === message.author.id && !user.bot;
            const collector = FightMsg.createReactionCollector(filter, { time: 20000 });
            collector.on('collect', async reaction => {
                require('./../../assets/functions/emoji/menu')(
                    MenuConfig,
                    reaction, 
                    oldReactionsIDList
                );
            });
            collector.on('end', collected => {
                BattleData.move++;
                if(!BattleData.finished) {
                    FightMsg.edit(FightEmbed.setFooter('Ход ' + BattleData.move))
                    return Move();
                } else {
                    FightMsg.edit(FightEmbed.setFooter('Ход ' + BattleData.move + " Бой окончен!"))
                }
            });
        };
    }
}