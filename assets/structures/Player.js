const { Structures } = require("discord.js");

module.exports = Structures.extend(
    "GuildMember",
    GuildMember =>
    class extends GuildMember {
        constructor(client, data, guild) {
            super(client, data, guild);
            
            this.cool = true;
        };
    }
);