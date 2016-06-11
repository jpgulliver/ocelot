var express = require('express');
var router = express.Router();
var pool = require('./../configDB.js');
var bcrypt = require('bcrypt-nodejs');

/* POST signup. */
router.post('/', function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
  pool.getConnection(function(err, connection){
    connection.query("INSERT INTO users (username, password, email, validated) VALUES (?, ?, ?, 0);", [req.body.username, hash, req.body.email], function(err, rows){
      if(err){
        console.log(err);
		res.send('signup failed');
	  } else{
		console.log(req.body.password);
	  }
    });
    connection.release();
  });
});

module.exports = router;
