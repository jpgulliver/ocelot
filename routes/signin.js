var express = require('express');
var router = express.Router();
var pool = require('./../configDB.js');

/* POST signin. */
router.post('/', function(req, res, next) {

  pool.getConnection(function(err, connection){
    connection.query("SELECT * FROM users WHERE username = ?",[req.body.username],  function(err, rows){
      if(err){
        throw err;
	  } else{
	    console.log(rows);
	  }
    });
    connection.release();
  });
});

module.exports = router;
