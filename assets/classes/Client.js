const { Client, Collection } = require('discord.js'); // require client and collection
module.exports = class extends Client { /** @extends the client */
constructor(config) { // constructor
        super(config);

        this.commands = new Collection();

        this.aliases = new Collection();

        this.cooldowns = new Collection();

        this.blacklist = ['someones id you dislike'];

        this.owners = ['603250566092816388'];
        
    };
}