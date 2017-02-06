var request = require("request");

var repo = require(process.cwd()+'/repo');


module.exports = function(bot, db, data) {
    var query = data.trigger + "+" + data.params.join("+")
    bot.log("info", "BOT", 'DataTrigger: ' +  query);
    var properties = {q: query, api_key: 'dc6zaTOxFJmzC'};
	request({url: "http://api.giphy.com/v1/gifs/search", qs: properties}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);
                    try {
                        rand = Math.floor(Math.random()*json['data'].length);
                        bot.sendChat(json['data'][rand]['images']['fixed_height']['url']);
                    } catch(err) {
                        bot.log("info", "BOT", 'Couldnt load request ' + body);
                        bot.sendChat("http://i.giphy.com/T1XuduO9KsxBC.gif");
                    }
                }
                else {
                    bot.log("info", "BOT", 'Couldnt load request ' + body);
                    bot.sendChat("http://i.giphy.com/T1XuduO9KsxBC.gif");
                }
            });
};
