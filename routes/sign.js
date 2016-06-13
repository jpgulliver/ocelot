/*
These API routes handle signing in and account creation. It implements bcrypt for
hashing passwords and jwt to create authentication tokens.
*/
var express = require('express');
var router = express.Router();
var pool = require('./../config.js').pool;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secretKey = require('./../config.js').secretKey;

// Creates a jwt token that expires in a year.
var jwtGen = function(userIdVar, userNameVar) {
	var payload = {
		iss: 'ocelot',       // Issuer
		data: {
			userId: userIdVar, // userid from the users table
			userName: userNameVar // User name
		}
	};
	var token = jwt.sign(payload, secretKey, {expiresIn: '365d', notBefore: '0'});
	return token;
}

/* POST signup. */
// TODO: Check username, password, and email requirements are met.
router.post('/signup', function(req, res, next) {
	// Asynchronously generates hash using bcrypt.
	bcrypt.hash(req.body.password, bcrypt.genSaltSync(), null, function(err, hash) {
		// Error when hashing.
		if(err){
			console.log(err);
			res.send({success: false, message: 'Signup failed.'});
		} else {
			// Tries to insert into table
			pool.getConnection(function(err, connection){
				connection.query("INSERT INTO ocelot_user (username, hashed_password, email, validated) VALUES (?, ?, ?, 0);",
						[req.body.username, hash, req.body.email], function(err, rows){
					// Failed to insert
					if(err){
						console.log(err);
						res.send({success: false, message: 'Signup failed.'});
					} else {
						// Send back authenticated jwt tokent
						res.send({success: true, jwt: jwtGen(rows.insertId, req.body.username)});
					}
				});
				connection.release();
			});
		}
	});
});

// Information for signup page. Updates the 
// username taken and email taken messages.
router.get('/signup', function(req, res, next) {
	// Create appropriate query
	var query;
	if(req.query.type == "username") {
		query = "SELECT * FROM ocelot_user WHERE username = ?;";
	} else {
		query = "SELECT * FROM ocelot_user WHERE email = ?;";
	}
	pool.getConnection(function(err, connection){
		connection.query(query, [req.query.value], function(err, rows){
			// Select failed.
			if(err){
				res.send({success: false, available: false});
			} else {
				// Check if a row was found.
				if(rows.length >= 1) {
					res.send({success: true, available: false});
				} else {
					res.send({success: true, available: true});
				}
			}
		});
		connection.release();
	});
});

/* POST signin. */
router.post('/signin', function(req, res, next) {
	pool.getConnection(function(err, connection){
		connection.query("SELECT * FROM ocelot_user WHERE username = ?", [req.body.username],  function(err, rows){
			// Signin error from select from database
			if(err){
				console.log(err);
			} else {
				if(rows.length <= 0) {
					res.send({success: false, message: 'Login failed.'});
				} else {
					// Compares password and hash asynchronously.
					bcrypt.compare(req.body.password, rows[0].hashed_password, function(err, result) {
						// Hash compare failed.
						if(err) {
							res.send({success: false, message: 'Login error.'});
						} else {
							// Sends back jwt if correct, else sends failed.
							if(result) {
								res.send({success: true, jwt: jwtGen(rows[0].id, req.body.username)});
							} else {
								res.send({success: false, message: 'Login failed.'});
							}
						}
					});
				}
			}
		});
		connection.release();
	});
});

module.exports = router;
