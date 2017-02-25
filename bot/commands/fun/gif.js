var randw = require(process.cwd()+"/bot/utilities/randomword");
var repo = require(process.cwd()+'/repo');
var request = require("request");

module.exports = function(bot, db, data, rw) {
    var query = '';
    var randwerd = 'random';
    randw.randomWord(bot, rw, function(data){
        bot.log("INFO", "BOT", "Random word: " + data);
        randwerd = data;
    });
    if (data.params.length > 0) {
        query = data.params.join("+") + "+" + randwerd;
    } else {
        query = randwerd
    }
    bot.log("info", "BOT", 'GIF Query: ' + query);
    var properties = {q: query, api_key: 'dc6zaTOxFJmzC'};
	request({url: "http://api.giphy.com/v1/gifs/search", qs: properties}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);

                    rand = Math.floor(Math.random()*json['data'].length);
                    bot.sendChat(json['data'][rand]['images']['fixed_height']['url']);
                }
                else {
                    bot.log("info", "BOT", 'Couldnt load request ' + body);
                    bot.sendChat("http://i.giphy.com/T1XuduO9KsxBC.gif");
                }
            });
};
