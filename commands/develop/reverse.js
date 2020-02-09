const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'reverse',
    aliases: '',
    guildonly: true,
    usage: '',
    devonly: true,
    blacklist: [''],
    run: async (client, message, args) => {
        if(args[0].includes('<#')) {
            var chid = args[0];
            var msgid = args[1];
        } else var msgid = args[0], chid = message.channel.id;

        console.log(chid, msgid);
        let ch = message.guild.channels.get(chid.slice(2, -1) || message.channel.id) || message.channel;
        ch.messages.fetch(msgid).then(msg => {
            if(!msg.embeds[0]) return message.channel.send(msg.content);
            else {
                let { hexColor, title, description, footer, author, image, thumbnail, timestamp } = msg.embeds[0];
                let ReversedEmbed = new MessageEmbed();
                if(hexColor) ReversedEmbed.setColor(hexColor); 
                if(title) ReversedEmbed.setTitle(title); 
                if(description) ReversedEmbed.setDescription(description); 
                if(footer) ReversedEmbed.setFooter(footer.text, footer.proxyIconURL); 
                if(author) ReversedEmbed.setAuthor(author.name, author.proxyIconURL);
                if(image) ReversedEmbed.setImage(image.proxyURL ); 
                if(thumbnail) ReversedEmbed.setThumbnail(thumbnail.proxyURL); 
                if(timestamp) ReversedEmbed.setTimestamp(timestamp); 
                let cmdmsg = `\`\`\`md\n\\\\say ${hexColor ? 'c& ' + hexColor : ''}${title ? ' t& ' + title : ''}${description ? ' d& ' + description : ''}${footer ? ' f& ' + footer.text : ''}${footer ? footer.proxyIconURL ? ' fu& ' + footer.proxyIconURL : '' : ''}${image ? ' image& ' + (image.url || image.proxyURL) : ''}${thumbnail ? ' thumb& ' + (thumbnail.url || thumbnail.proxyURL) : ''}\`\`\``;
                if(args[args.length-1] === 'content') message.channel.send(cmdmsg);
                else message.channel.send(ReversedEmbed);
            }
        })
    }
}