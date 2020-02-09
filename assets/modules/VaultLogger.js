const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.on('guildMemberAdd', (member) => {
        log(new MessageEmbed()
            .setColor('#72ed45')
            .setAuthor(`${member.user.tag} ${member.nickname ? `(${member.nickname})` : ''} Присоединился к серверу`, member.user.displayAvatarURL())
            .setTimestamp()
        , '672492880354476062');
    });
    client.on('guildMemberRemove', (member) => {
        log(new MessageEmbed()
            .setColor('#ba421e')
            .setAuthor(`${member.user.tag} ${member.nickname ? `(${member.nickname})` : ''} Покинул сервер`, member.user.displayAvatarURL())
            .setTimestamp()
        , '672492880354476062');
    });
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        if(oldMember.nickname !== newMember.nickname) {
            log(new MessageEmbed()
            .setColor('#d6e03f')
            .setAuthor(`${oldMember.user.tag} сменил никнейм\nСтарый никнейм: ${oldMember.nickname ? oldMember.nickname : oldMember.user.username}\nНовый никнейм: ${newMember.nickname ? newMember.nickname : newMember.user.username}`, oldMember.user.displayAvatarURL())
            .setTimestamp()
            , '672394189761413140');
        }
    });
    client.on('voiceStateUpdate', (oldVoice, newVoice) => {
        if(oldVoice.channelID !== newVoice.channelID) {
            let st = (newVoice.channel && oldVoice.channel ? 
                `Переместился с ${oldVoice.channel.name} на ${newVoice.channel.name}` : 
                (!oldVoice.channel ? 
                    `Подключился к ${newVoice.channel.name}` :
                    (!newVoice.channel ? `Отключился от ${oldVoice.channel.name}` : '?')))
            log(new MessageEmbed()
            .setColor('#4400cc')
            .setAuthor(newVoice.member.user.tag, oldVoice.member.user.displayAvatarURL())
            .setDescription(st)
            .setTimestamp()
            , '672394245985796097');
        }
        if(oldVoice.serverDeaf !== newVoice.serverDeaf) {
            setTimeout(() => {
                oldVoice.member.guild.fetchAuditLogs({ type: 24 })
                .then(audit => {
                    log(new MessageEmbed()
                    .setColor('#24d4c5')
                    .setAuthor(`${audit.entries.first().executor.tag} заглушил ${oldVoice.member.user.tag}`)
                    .setTimestamp()
                    , '672504891486371851');
                })
            }, 2000);
        }
    })

    function log(msg, ch_id) {
        client.guilds.get('672392827078180865').channels.get(ch_id).send(msg)        
    }
}