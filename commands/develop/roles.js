module.exports = {
    name: 'role',
    aliases: '',
    guildonly: true,
    usage: '',
    devonly: true,
    blacklist: [''],
    run: async (client, message, args) => {
        if(message.member.permissions.has('MANAGE_ROLES')) {
            console.log(args) 
            if(args[args.length-1] === 'member') message.mentions.members.first().roles[args[0]](args[1]);
            if(args[args.length-1] === 'guild') {
                message.guild.roles.fetch(args[2]).then(r => r[args[0]](message.guild.roles.size-parseInt(args[1])));
            }
        }
        else return message.channel.send('u gay');
    }
}