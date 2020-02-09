const { Structures } = require("discord.js");

module.exports = Structures.extend(
    "Guild",
    Guild =>
    class extends Guild {
        constructor(client, data) {
            super(client, data);
            
            this.lang = {};

            this.powerlevel = 0;
        };

        setLang(region) { 
            try {
                this.lang = require(`./../../config/lang/${region}`);
            } catch {
                console.warn(`[WARN] ${region}.js does not exist`.yellow)
                this.lang = require(`./../../config/lang/en`);
            };
        };

        update() {
            
        };
    }
);