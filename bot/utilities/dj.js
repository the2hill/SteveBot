module.exports.dj = null;
module.exports.djStarted = false;

var vm = this;

var genre = ['rock and roll', 'rap thug', 'classical piano', 'steve miller band',
'sublime', 'marilyn manson', 'SRV', 'jimi hendrix', 'flatbush zombies', 'danzig'];


module.exports.startDj = function startDj(bot, yt) {

    if(vm.dj) clearTimeout(vm.dj); //don't have multiple dj timeouts running at once

    //start another dj check in 2-5 min
    setTimeout(function(){vm.startDj(bot, yt)}, (Math.floor(Math.random() * (1000*60*2)) + (1000*60*5)));

    if(bot.getQueue().length >= 1 || vm.djStarted === true) return; //don't start a dj if queue is too large or another is started

    vm.djStarted = true;

//    bot.sendChat(":loudspeaker: DubToner is picking up the slack...");
    var rand = (Math.floor(Math.random() * (49)) + (0));
    randgenre = genre[Math.floor((Math.random() * genre.length - 1) + 0)]

    yt.addParam('type', 'video');
    yt.addParam('videoCategoryId', '10');
    yt.search(randgenre, 50, function(error, result) {
      if (error) {
        bot.log("info", "BOT", 'Error Response: ' + JSON.stringify(error));
      }
      else {
        bot.queueMedia("youtube", result['items'][rand]['id']['videoId'], function(response){});
      }
    });
    vm.djStarted = false;
};
