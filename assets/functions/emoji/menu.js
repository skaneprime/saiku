module.exports = async (data, messageReaction, oldReactionsIDList) => {
    var ndata;
    await data.forEach(async d => {
        if(d.teID === messageReaction.emoji.id || d.eIDA.includes(messageReaction.emoji.id)) ndata = d;
    });
    if(!ndata) return;
    let { teID, eIDA } = ndata;
    if(messageReaction.emoji.id === teID) {
        await messageReaction.message.reactions.removeAll();
        eIDA.forEach(async emoji_id => {
            try {
                await messageReaction.message.react(emoji_id);
            } catch (err) { console.log(err) };
        });
    } else if(eIDA.includes(messageReaction.emoji.id)) 
        await require('./handler')(messageReaction.emoji.id, oldReactionsIDList, messageReaction);
}