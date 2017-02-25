var mediaInfo = require(process.cwd()+"/bot/utilities/media");
    settings = require(process.cwd() + '/settings.js').settings;

var repo = require(process.cwd()+'/repo');

var genre = [];

module.exports = function(bot, db, data, clev, yt) {
    bot.log("info", "BOT", 'TonerBot Command: ' + data.params.join(" "));
    if(data.params.length > 0) {
        var query = data.params.join(" ");
        if (query.includes(".q")) {
            query = query.substring(2);
            yt.search(query, 50, function(error, result) {
              if (error) {
                bot.log("info", "BOT", 'Error Response: ' + error);
              }
              else {
                bot.queueMedia("youtube",
                result['items'][(Math.floor(Math.random() * 49))]['id']['videoId'],
                function(response){});
              }
            });
        } else if (query.includes('song')) {
            bot.sendChat(mediaInfo.currentName + ' is currently playing...');
        } else {
//            clevv = new cleverbot(settings.API_USER, settings.API_KEY);
            clev.setNick(data.user.username);
            clev.create(function(err, response) {
                bot.log("info", "BOT", 'NICK Clev: ' + clev.nick);
                clev.ask(query, function(err, response) {
                    if (err) throw response;
                    bot.log("info", "BOT", 'TonerBot Says: ' + response);
                    bot.sendChat(response);
                });
            });
//        fallback
//            cleverbot = new Cleverbot;
//            Cleverbot.prepare(function(){
//              clev.write(data.params.join(" "), function (response) {
//                   bot.sendChat(response.message)
//              });
//            });
        }
    }
};
