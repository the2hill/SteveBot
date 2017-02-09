var logUser = function(db, user, callback) {
	findUserById(db, user.id, function(foundUser) {
		if(!foundUser){
			insertUser(db, user, function(newUser){
				user.logType = "inserted";
				return callback(user);
			});
		}
		else {
			var username = user.username;
			db.collection("users").updateOne(
			{ "id" : user.id },
			{
				$set: { "dubs": user.dubs },
				$currentDate: { "LastConnected": true }
			}, function(err, results) {
				user.logType = "updated";
				return callback(user);
		    });
		}
	});
};

var findUserById = function(db, userid, callback) {
	db.collection("users").findOne( { "id": userid }, function(err, doc) {
		if (doc != null) {
	        callback(doc);
	    } else {
	        callback();
	    }
	});
};

var updateUser = function(db, userid, user, callback) {

};

var insertUser = function(db, user, callback) {
	user.props = 0;
	user.hearts = 0;
	user.DateAdded = new Date();
	user.LastConnected = new Date();
	db.collection("users").insertOne(user, function(err, result) {
	    callback(result.ops[0]);
  	});
};

var findSpinByQ = function(db, q, callback) {
	db.collection("spins").findOne( { "q": q }, function(err, doc) {
		if (doc != null) {
	        callback(doc);
	    } else {
	        callback();
	    }
	});
};


var addSpin = function(db, spin, callback) {
    findSpinByQ(db, spin, function(foundSpin) {
		if(!foundSpin){
			insertSpin(db, spin, function(newSpin){
				return callback(spin);
			});
		}
	});
};

var insertSpin = function(db, spin, callback) {
	db.collection("spins").insert({'q': spin}, function(err, result) {
	   return callback(result.ops[0]);
  	});
};

var findSpins = function(db, callback) {
        db.collection("spins").find().toArray(function(err, spins) {
            if (spins != null) {
                return callback(spins);
                } else {
                    return callback();
            }
	});
};

var propsUser = function(db, user, callback) {
	db.collection("users").updateOne(
	   { "id": user.id },
	   { $inc: { props: 1 } },
	   { },
	    function(err,data){
	        if (err){
	            console.log("ERR:", err);
	            callback();
	        }else{
	        	findUserById(db, user.id, function(foundUser){
					console.log("Updated ", user.username, " props ", foundUser.props);
					return callback(foundUser);
	        	});
	        }
	    }
	);
};

var heartsUser = function(db, user, callback) {
	db.collection("users").updateOne(
	   { "id": user.id },
	   { $inc: { hearts: 1 } },
	   { },
	    function(err,data){
	        if (err){
	            console.log("ERR:", err);
	            callback();
	        }else{
	        	findUserById(db, user.id, function(foundUser){
					console.log("Updated ", user.username, " hearts ", foundUser.hearts);
					return callback(foundUser);
	        	});
	        }
	    }
	);
};

var propsLeaders = function(db, callback) {
	var propsCursor = db.collection("users").find().sort( { props: -1 } ).limit(3);
	propsCursor.toArray(function(err, docs) {
		if (docs != null) {
			callback(docs);
		} else {
			callback();
		}
	});
};

var heartsLeaders = function(db, callback) {
	var heartsCursor = db.collection("users").find().sort( { hearts: -1 } ).limit(3);
	heartsCursor.toArray(function(err, docs) {
		if (docs != null) {
			callback(docs);
		} else {
			callback();
		}
	});
};

// String queries of tunes to search for and spin
var spins = function(db, callback) {
	var heartsCursor = db.collection("users").find().sort( { hearts: -1 } ).limit(3);
	heartsCursor.toArray(function(err, docs) {
		if (docs != null) {
			callback(docs);
		} else {
			callback();
		}
	});
};

module.exports.logUser = logUser;
module.exports.findUserById = findUserById;
module.exports.updateUser = updateUser;
module.exports.insertUser = insertUser;
module.exports.addSpin = addSpin;
module.exports.insertSpin = insertSpin;
module.exports.findSpins = findSpins;
module.exports.propsUser = propsUser;
module.exports.heartsUser = heartsUser;
module.exports.propsLeaders = propsLeaders;
module.exports.heartsLeaders = heartsLeaders;
