var mysql = require('mysql');
var mysqlConnection = mysql.createPool({
  host     : '0.0.0.0',
  user     : 'root',
  password : 'Tit@nium123_Us@c',
  database : 'so1'
});

module.exports = mysqlConnection;
