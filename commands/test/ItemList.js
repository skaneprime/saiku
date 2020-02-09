module.exports = {
    name: 'itemlist',
    aliases: '',
    guildonly: true,
    usage: '',
    devonly: true,
    blacklist: [''],
    run: async (client, message, args) => {
        console.log(await process.ItemList[args[0]](args[1], { id: args[1], name: args[2], desc: args[3] }));
    }
}