var dj = require(process.cwd()+"/bot/utilities/dj");

module.exports = function(bot, db, data, yt) {
	if(!bot.hasPermission(data.user, "set-roles") && data.user.username != "mbsurfer") {
        return bot.moderateDeleteChat(data.id, function(response){
            bot.log("info", "BOT", "Nice try @" + data.user.username + " :sunglasses:");
        });
    }

    if (data.params.join(" ").includes('stop')) {
        dj.djCanSpin = false;
    } else if (data.params.join(" ").includes('start')) {
        dj.djCanSpin = true;
    }

    if(!dj.djStarted)
        dj.startDj(bot, yt);
};
