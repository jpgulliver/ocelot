var express = require('express');
var router = express.Router();
var pool = require('./../config.js').pool;
var secretKey = require('./../config.js').secretKey;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

/* POST signin. */
router.post('/', function(req, res, next) {

  pool.getConnection(function(err, connection){
    connection.query("SELECT * FROM users WHERE username = ?",[req.body.username],  function(err, rows){
      if(err){
        console.log(err);
	  } else{
	    console.log(rows);
		console.log(req.body.password);
		if(rows.length <= 0) {
			res.send('login failed');
		} else {
			if(bcrypt.compareSync(req.body.password, rows[0].password)) {
				var payload = {
					iss: 'ocelot',       // Issuer
					data: {
						userId: rows[0].userId, // userid from the users table
						userName: req.body.username // User name
					}
				};
				var token = jwt.sign(payload, secretKey, {expiresIn: '364d', notBefore: '0'});
				res.send({jwt: token});
			} else {
				res.send('login failed');
			}
		}
	  }
    });
    connection.release();
  });
});

module.exports = router;
