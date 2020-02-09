module.exports = async (client) => {
    require('./../assets/functions/other/GuildsInit')(client.guilds);
    console.log(`[INFO] `.grey + `Logged as ${client.user.tag}`);
    
    let Player = await process.db.getPlayer('603250566092816388');
    // console.log(Player);
    
    // await Player.inventory.add('senzu', 3);
    // console.log(Player.inventory);
    // await Player.inventory.add('box', 1);
    // console.log(Player.inventory);
}