var express = require('express');
var router = express.Router();
const mysqlConnection = require('../mysql_connection');

router.get('/obtenerSaludos',  function(req, res, next) {
    console.log(req.body)
    try {
        mysqlConnection.getConnection(function(err, connection) {
            if (err) console.error('err from callback: ' + err.stack); //throw err; // not connected!
            connection.query('select * from saludo', function (error, results, fields) {
                connection.release();
                if (error) throw error;
                res.status(200).send(results);
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Error en la conexion de la base de datos" });
    }
});

router.post('/agregarSaludo',  function(req, res) {
    console.log(req.body);
    try {
        mysqlConnection.getConnection(function(err, connection) {
            if (err) console.error('err from callback: ' + err.stack); //throw err; // not connected!
            connection.query('insert into saludo (texto) values ('+
            '\''+req.body.saludo+'\''+')', function(err, results, fields) {
                connection.release();
                if (err) console.error('err from callback: ' + err.stack); //throw err;
                res.status(200).json({ message: "Saludo insertado en la base de datos" });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Error en la conexion de la base de datos" });
    }
});

/* Ejemplo json para el post
{
    "saludo": "Hola"
}
*/
module.exports = router;