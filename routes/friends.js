/*
These API routes handle signing in and account creation. It implements bcrypt for
hashing passwords and jwt to create authentication tokens.
*/
var express = require('express');
var router = express.Router();
var pool = require('./../config.js').pool;
var jwt = require('jsonwebtoken');
var secretKey = require('./../config.js').secretKey;



// Get list of friends
router.get('/friends', function(req, res, next) {
	// Create appropriate query
	pool.getConnection(function(err, connection){
		connection.query("SELECT username FROM friendship INNER JOIN ocelot_user ON friendship.user2_id = ocelot_user.id WHERE user1_id = ?;",
				[req.decoded.data.userId], function(err, rows){
			// Failed to insert
			if(err){
				console.log(err);
				res.send({success: false, message: 'Failed to get friends list.'});
			} else {
				// Send back authenticated jwt token
				res.send({success: true, friends: rows});
			}
		});
		connection.release();
	});
});

module.exports = router;
