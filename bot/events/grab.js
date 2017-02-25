var request = require("request");
var mediaInfo = require(process.cwd()+"/bot/utilities/media");
var usersInfo = require(process.cwd()+"/bot/utilities/users");

// public beta key...
var properties = {q: 'quagmire+bill+cosby', api_key: 'dc6zaTOxFJmzC'};

module.exports = function(bot, db, clev, yt, rw) {
    bot.on(bot.events.roomPlaylistGrab, function(data) {
        bot.log("info", "BOT", data.user.username + ': Grabbed ' +  mediaInfo.currentName + ' Played By: ' + mediaInfo.currentDJName);
//         public beta key...
        if(data.user.username == mediaInfo.currentDJName) {
            bot.sendChat('@' + data.user.username + ' ... Grabbing yourself in public again? ...');
            request({url: "http://api.giphy.com/v1/gifs/search", qs: properties}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);

                    rand = Math.floor(Math.random()*(json['data'].length-1));
                    bot.sendChat(json['data'][rand]['images']['fixed_height']['url']);
                }
                else {
                    bot.log("info", "BOT", 'Couldnt load request ' + body);
                    bot.sendChat("http://i.giphy.com/T1XuduO9KsxBC.gif");
                }
            });
        }
    });
};
