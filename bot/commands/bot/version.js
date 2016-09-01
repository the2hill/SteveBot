var pkg = require(process.cwd() + "/package.json");

module.exports = function(bot, db) {
    bot.sendChat("TonerBot version: " + pkg.version);
};

module.exports.extraCommands = ["v", "ver"];
