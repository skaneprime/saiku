module.exports = {
    name: 'player',
    aliases: '',
    guildonly: true,
    usage: '',
    devonly: true,
    blacklist: [''],
    run: async (client, message, args) => {
        process.db.getPlayer(args[0])
        .then((player) => {
            console.log(player);
        }).catch((err) => {
            if(err) console.log(err);
        });
    }
}