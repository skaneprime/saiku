const { MessageEmbed } = require('discord.js')
reqEvent = (event) => require(`./../../events/${event}`);

module.exports = async (client) => {
    // throw new Error('GAY');
    client.on('ready', () => {
        reqEvent('ready')(client)
        // client.emit('guildMemberAdd', client.guilds.get('672392827078180865').members.first());
    });
    client.on('message', (message) => reqEvent('message')(client, message, undefined, ">"));
    client.on('dbconnect', ({ err, con }) => reqEvent('dbconnect')(err, con));
    process.on('unhandledRejection', (reason) => {
        try {
            let errorarr = reason.stack.split('at');
            let dir = errorarr[1].split('module.exports')[1] !== undefined ? errorarr[1].split('module.exports')[1].replace(/\s+/g,' ').trim() : errorarr[1].split('module.exports');
            console.log(`[PROCESS] `.rainbow + `[${reason.name.toUpperCase().red}] `.toUpperCase().red + `${reason.message.toUpperCase().red} ` + ` at `.cyan + `${dir} `.gray);
            console.log(reason); 
        } catch {
            console.log(`[ERROR] Can't transform unhandledRejection to formlog`.red, `Message:`.gray, `${reason}`.yellow)
        };
    });
}