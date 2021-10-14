var express = require('express');
var router = express.Router();

const client = require('../../cliente/greeter_client')

router.post('/agregarCaso',  function(req, res) {
    //console.log(req.body);
    const data_caso = {
        name : req.body.name,
        location : req.body.location,
        age : req.body.age,
        infected_type : req.body.infected_type,
        state : req.body.state
    }
    client.AddCaso(data_caso, function(err, response) {
        //console.log('Greeting:', response.message);
        res.send({mensaje:response.message});
    });
    
  
});

router.post('/listarCasos',  function(req, res) {
    const rows = [];
    //const ListarCasosRequest = { id_evento : req.body.id_evento };
    //const call = client.ListarCasos(ListarCasosRequest);
    const call = client.ListarCasos();
    call.on('data', function(data) {
        rows.push(data);
    });
    call.on('end', function() {
        console.log('Data obtenida con exito');
        res.send(rows);
    });
    call.on('error', function(e) {
        console.log('Error al obtener la data');
    });
    /*
    call.on('status', function(status) {
        // process status
    });
    */
});


module.exports = router;