var repo = require(process.cwd()+'/repo');
var wait = require('wait.for');

module.exports.randomWord = function randomWord(bot, rw, callback) {
    rw.words.getRandomWord({}, function(data){
        return callback(data.obj.word);
    });
};
