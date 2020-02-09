const { MessageEmbed } = require('discord.js')
const fs = require('fs');
reqEvent = (event) => require(`./../../events/${event}`);
module.exports = async (client) => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', (message) => reqEvent('message')(client, message, process.db.con, ">"));
};