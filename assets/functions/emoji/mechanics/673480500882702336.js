module.exports = async (oldReactionIDList, messageReaction) => {
    console.log('RETURN EMOJI')
    let curReactionsID = [];
    await messageReaction.message.reactions.map(r =>curReactionsID.push(r.emoji.id));
    if(curReactionsID === oldReactionIDList) return;
    await messageReaction.message.reactions.removeAll();
    await oldReactionIDList.forEach(async ReactionID => {
        await messageReaction.message.react(ReactionID)
    });
};