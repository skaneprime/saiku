const { Collection, MessageEmbed } = require('discord.js')
module.exports = async (client, message, con, prefix) => {
    if(!prefix)
        prefix = '>'
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
    try {
        const command = client.commands.get(commandName)|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if([null, undefined].includes(command))
            return;
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Команда на перезарядке!`);
            }
        }
        if(command.devonly && !client.owners.includes(message.author.id)) return message.reply('You Shall Not Pass!!!')
        if(command.blacklist.includes(message.author.id)) return message.reply('U are not allowed to use this command.')
        if (command.guildOnly && message.channel.type !== 'text')
            return message.reply('Запрещено использовать эту команду вне сервера');
        if (command.args && !args.length) {
            let reply = `Вы не указали аргументы, ${message.author}!`;
            if (command.usage) reply += `\nПравильное использование будет: \`${prefix}${command.name} ${command.usage}\``;
            return message.channel.send(reply);
        }
        if(command) command.run(client, message, args, con);
    } catch (error) {
        console.error(error)
        // message.reply(`Случилась ошибка во время обработки запроса! Подробности уже были высланы разработчику!`);
        let errorarr = error.stack.split('at')
        let ErrorInfo = {
            dir: errorarr[1].slice(39,-12),
            line: errorarr[1].slice(67,-9),
            fulldir: errorarr[1].slice(17,-12)
        }
        // console.log(InviteURL)
        let ErrorEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Приглашение на [**${message.guild.name}**](${ await message.channel.createInvite() })`)
        .addField(`Произошло на **${message.guild.name}**`, `\`\`\`fix\n Сервер: ${message.guild.name}\n Кол-во участников: ${message.guild.members.size}\n Владелец: ${message.guild.owner.user.tag}\n Канал: ${message.channel.name}\n Выполнил: ${message.author.tag}\`\`\`\n\`\`\`diff\n+ MessageContent: ${message.content}\`\`\``)
        .addField(`**Ошибка в коде!**`, `\`\`\`diff\n- ${error}\n\n- Путь к файлу: ${ErrorInfo.dir}\n- Строка: ${ErrorInfo.line}\n\nПолный путь: ${ErrorInfo.fulldir}\`\`\``)
        .setColor(`RED`)
        // if(message.guild.splashURL) {
        //     ErrorEmbed.setFooter('🔶',message.guild.splashURL + '?size=512')
        // }
        message.guild.members.get('603250566092816388').send(ErrorEmbed)
    }
}