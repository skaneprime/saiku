module.exports = {
    name: 'member',
    aliases: '',
    guildonly: true,
    usage: '',
    devonly: true,
    blacklist: [''],
    run: async (client, message, args) => {
        message.mentions.members.first()[args[1]](args[2])
    }
}