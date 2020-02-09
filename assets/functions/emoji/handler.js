module.exports = async (id, oldReactionIDList, messageReaction) => {
    require(`./mechanics/${id}`)(oldReactionIDList, messageReaction); // Return Emoji
}