var mediaInfo = require(process.cwd()+"/bot/utilities/media");
    settings = require(process.cwd() + '/settings.js').settings;
    Cleverbot = require('cleverbot-node');



var repo = require(process.cwd()+'/repo');

module.exports = function(bot, db, data, clev) {
    bot.log("info", "BOT", 'TonerBot: ' + data.params.join(" "));
    if(data.params.length > 0) {
        var query = data.params.join(" ")
        if (query.includes('song')) {
            bot.sendChat(mediaInfo.currentName + ' is currently playing...');
        } else {
//            bot.sendChat('testfool');
            bot.log("info", "BOT", 'Before Clev: ' + data.user.username);
//            var clev = new cleverbot(settings.API_USER, settings.API_KEY);
//            clev.setNick(data.user.username);
//            clev.create(function(err, response) {
//                bot.log("info", "BOT", 'NICK Clev: ' + clev.NICK);
//                clev.ask(query, function(err, response) {
//                    if (err) throw response;
//                    bot.log("info", "BOT", 'TonerBot Says: ' + response);
//                    bot.sendChat(response)
//                });
//            });
//        fallback
//            cleverbot = new Cleverbot;
            Cleverbot.prepare(function(){
              clev.write(data.params.join(" "), function (response) {
                   bot.sendChat(response.message)
              });
            });
        }
    }
};
