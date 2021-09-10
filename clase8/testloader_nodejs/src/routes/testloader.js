var express = require('express');
var router = express.Router();
require('dotenv').config()
const axios = require('axios').default;
let fs = require('fs');
const ruta_archivo_entrada ='/Users/carlosdavid/Desktop/SO1_Code/clase8/testloader_nodejs/src/files/lista_casos.json';
var tempo = 0;
let data = fs.readFileSync(ruta_archivo_entrada, 'utf-8');
const doc = JSON.parse(data)
var data_array = [];
for(var i in doc){
    data_array.push(doc[i]);
}

var idVar;
var contador_enviados = 0;
var contador_errores = 0;

router.get('/', function(req, res, next) {
    res.status(200).send("NODEJS - TEST LOADER");
    prepararApis();
    console.log(process.env.SERVICE_SALUDO_HOST)
});

router.get('/iniciarEnvio', function(req, res) {
    contador_enviados = 0;
    contador_errores = 0;
    res.status(200).json({ message: "Se ha iniciado el envio de datos " });
    idVar = setInterval(() => { 
        iniciarEnvio() 
    }, 1000);
});

router.get('/detenerEnvio', async function(req, res) {
    res.status(200).json({ message: "Se ha finalizado el envio de datos " });
    deternerEnvio();
});

router.get('/reporte', async function(req, res) {
    res.status(200).json({ Enviados:contador_enviados ,Errores: contador_errores});
    deternerEnvio();
});
  
async function iniciarEnvio() {  
    let endPointsSave = ['/save','/go-run/save']; 
    let rand = Math.floor(Math.random() * 2);
    console.log(` Se esta enviando data a - > http://${process.env.SERVICE_HOST}`+endPointsSave[rand]);
   
    await axios.post(`http://${process.env.SERVICE_HOST}`+endPointsSave[rand],doc[tempo])
        .then(function(response) {
            console.log(response.data)
            contador_enviados++;
            if (tempo < data_array.length) {
                tempo++;
            } else {
                tempo =0;
            }
        })
        .catch(function(error) {
             console.log("ES ERROR :("+error);
             contador_errores++;
        })
        .then(function() {}); 
}
  
function deternerEnvio() {
    clearInterval(idVar);
}

function prepararApis(){
    let endPointsIniciar = ['/iniciar-JS-Ubuntu','/iniciar-GO-Ubuntu','/iniciar-JS-CentOS','/iniciar-GO-CentOS'];
    
    for (let value of endPointsIniciar) {
        console.log("Enviando instruccion de inicio a "+value+"");
        axios.get(`http://${process.env.SERVICE_HOST}`+value)
        .then(function (response) {
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
}
module.exports = router;