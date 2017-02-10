var repo = require(process.cwd()+'/repo');
var spinsInfo = require(process.cwd()+'/bot/utilities/spins');

module.exports.dj = null;
module.exports.djStarted = false;
module.exports.djCanSpin = true;

var LIMIT = 50;

var vm = this;

module.exports.startDj = function startDj(bot, yt) {

    if(vm.dj) clearTimeout(vm.dj); //don't have multiple dj timeouts running at once

    //start another dj check in 2-5 min
    setTimeout(function(){vm.startDj(bot, yt)}, (Math.floor(Math.random() * (1000*60*2)) + (1000*60*5)));

    if(bot.getQueue().length >= 1 || vm.djStarted === true || !vm.djCanSpin) return; //don't start a dj if queue is too large or another is started

    vm.djStarted = true;

    var randspin = null;
    if (spinsInfo.spins.length > 0) {
        randspin = spinsInfo.spins[Math.floor(Math.random() * spinsInfo.spins.length)];
    }

    var s = randspin ? randspin : {'q': 'random'};
    bot.log("info", "BOT", 'Spinning something from: ' + JSON.stringify(s));

    yt.addParam('type', 'video');
    yt.addParam('videoCategoryId', '10');

    yt.search(s['q'], LIMIT, function(error, result) {
      if (error) {
        bot.log("info", "BOT", 'Error Response: ' + JSON.stringify(error));
      }
      else {
        var rand = (Math.floor(Math.random() * LIMIT - 1));
        if ('items' in result) {
            var qmed = result['items'][rand]['id']['videoId'];
            bot.queueMedia("youtube", qmed, function(response){});
        }
      }
    });
    vm.djStarted = false;
};
