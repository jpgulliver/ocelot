var express = require('express');
var router = express.Router();
var pool = require('./../config.js').pool;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secretKey = require('./../config.js').secretKey;

/* POST signup. */
router.post('/', function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
  pool.getConnection(function(err, connection){
    connection.query("INSERT INTO users (username, password, email, validated) VALUES (?, ?, ?, 0);", [req.body.username, hash, req.body.email], function(err, rows){
      if(err){
		res.send('signup failed');
	  } else{
		var payload = {
			iss: 'ocelot',       // Issuer
			data: {
				userId: rows.insertId, // userid from the users table
				userName: req.body.username // User name
			}
		};
		var token = jwt.sign(payload, secretKey, {expiresIn: '364d', notBefore: '0'});
		res.send({jwt: token});
	  }
    });
    connection.release();
  });
});

router.get('/', function(req, res, next) {
  var query;
  if(req.query.type == "username") {
	query = "SELECT * FROM users WHERE username = ?;";
  } else {
	query = "SELECT * FROM users WHERE email = ?;";
  }
  console.log(query);
  console.log(req.query.type);
  pool.getConnection(function(err, connection){
    connection.query(query, [req.query.value], function(err, rows){
      if(err){
		res.send('selection failed');
	  } else{
		console.log(rows);
		console.log(req.query.value);
		if(rows.length >= 1) {
			res.send('taken');
		} else {
			res.send('ok');
		}
	  }
    });
    connection.release();
  });
});

module.exports = router;
