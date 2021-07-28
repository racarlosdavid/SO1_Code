var mysql = require('mysql');
var mysqlConnection = mysql.createPool({
  host     : '0.0.0.0',//<-- USO ESE CUANDO ESTOY CORRIENDO LA API EN MI COMPU -> ESTA CUANDO ESTOY CORRIENDO LA API EN EL CONTENEDOR'192.168.1.7',
  user     : 'root',
  password : 'Tit@nium123_Us@c',
  database : 'so1'
});

module.exports = mysqlConnection;
