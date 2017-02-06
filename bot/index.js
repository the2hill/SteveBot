var DubAPI = require("dubapi"),
    log = require("jethro"),
    MongoClient = require('mongodb').MongoClient,
    pkg = require(process.cwd() + "/package.json"),
    repo = require(process.cwd() + '/repo.js'),
    settings = require(process.cwd() + '/settings.js').settings;
    cluster = require('cluster');
    cleverbot = require("cleverbot-node");

//make logger timestamp more readable
log.setTimeformat("YYYY-MM-DD HH:mm:ss:SSS");

 if (cluster.isMaster) {
      cluster.fork();

      cluster.on('exit', function(worker, code, signal) {
        cluster.fork();
      });
    }

if (cluster.isWorker) {
    new DubAPI({ username: settings.USERNAME, password: settings.PASSWORD }, function(err, bot) {

        if (err) {
            return log("error", "BOT", err);
        }

        //to find out how to use jethro visit: https://github.com/JethroLogger/Jethro
        bot.log = require("jethro");
        bot.log.setTimeformat("YYYY-MM-DD HH:mm:ss:SSS");

        bot.log("info", "BOT", 'Running TonerBot with DubAPI v' + bot.version);

        //connect to db
        MongoClient.connect(settings.MONGODBURL, function(errDb, db) {

            function connect() {

                bot.connect(settings.ROOMNAME);

            }

            function disconnect(err) {
                db.close();
                bot.disconnect();

                if(err) bot.log("error", "BOT", err.stack);

                process.exit();
            }

            //Properly disconnect from room and close db connection when program stops
            process.on('exit', disconnect); //automatic close
            process.on('SIGINT', disconnect); //ctrl+c close
            process.on('uncaughtException', disconnect);

            bot.on("error", function(err) {
                bot.log("error", "BOT", err);
            });

            connect();

//            clev = new cleverbot(settings.API_USER, settings.API_KEY);
            clev = new cleverbot;

            require("./events")(bot, db, clev);
        });
    });
}


