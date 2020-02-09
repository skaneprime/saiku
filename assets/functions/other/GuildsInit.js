module.exports = async (guilds) => {
    await guilds.forEach(
        guild => {
            guild.setLang(guild.region);
        }
    );
}