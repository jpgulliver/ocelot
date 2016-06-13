/*
This is middleware that will identify JWT token.
*/
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secretKey = require('./../config.js').secretKey;

// Get list of friends
router.use(function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-auth-token'];
	
	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, secretKey, function(err, decoded) {      
			if (err) {
				return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(401).send({ 
			success: false, 
			message: 'No token provided.' 
		});
	}
});

module.exports = router;
