var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'ocelot.cfxx0yyzf2du.us-west-2.rds.amazonaws.com',
	user: 'admin',
	password: 'coatolivetap1!',
	database: 'ocelotDB',
	port: '3306'
});

module.exports = pool;