var spinsInfo = require(process.cwd()+'/bot/utilities/spins');
var repo = require(process.cwd()+'/repo');

module.exports = function(bot, db, data, yt) {
	if(!bot.hasPermission(data.user, "set-roles") && data.user.username != "mbsurfer") {
        return bot.moderateDeleteChat(data.id, function(response){
            bot.log("info", "BOT", "Nice try @" + data.user.username + " :sunglasses:");
        });
    }

    repo.addSpin(db, data.params.join(" "), function(spin){});
    repo.findSpins(db, function(spins){
        spinsInfo.spins.push.apply(spinsInfo.spins, spins)
    });
    bot.log("info", "Spin", "Added Spins");
};
