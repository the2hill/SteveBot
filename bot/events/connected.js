var mediaInfo = require(process.cwd()+'/bot/utilities/media');
var repo = require(process.cwd()+'/repo');
var raffleService = require(process.cwd()+'/bot/utilities/raffle');
var spinsInfo = require(process.cwd()+'/bot/utilities/spins');
var dj = require(process.cwd()+"/bot/utilities/dj");

module.exports = function(bot, db, clev, yt) {
    repo.addSpin(db, "cher", function(spin){});
    repo.findSpins(db, function(spins){
        spinsInfo.spins.push.apply(spinsInfo.spins, spins)
    });
    bot.on("connected", function(data) {
        bot.log("info", "BOT", 'Connected to ' + data);

        setTimeout(function(){

            var users = bot.getUsers();

            for(var i = 0; i < users.length; i++) {
                repo.logUser(db, users[i], function(data){});
            }

            bot.updub();

            var media = bot.getMedia();
            var dj = bot.getDJ();

            if(media){
                mediaInfo.currentName = media.name;
                mediaInfo.currentID = media.fkid;
                mediaInfo.currentType = media.type;
                mediaInfo.currentDJName = (dj == undefined ? "404usernamenotfound" : (dj.username == undefined ? "404usernamenotfound" : dj.username));
            }

            //start another raffle in 15-45 min
            setTimeout(function(){raffleService.startRaffle(bot)}, (Math.floor(Math.random() * (1000*60*60)) + (1000*60*90)));
        }, 5000);
    });
    if(bot.getQueue().length <= 1 || !dj.djStarted === true) {
        dj.startDj(bot, yt);
    }
};
