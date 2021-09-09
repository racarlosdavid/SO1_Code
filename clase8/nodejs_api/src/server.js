const express = require('express');
const app = express();
var morgan = require('morgan');
var cors = require('cors');
const mongoConnection = require('./mongo_connection');

//Settings
const port = 3001;

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/',require('./routes/nodejs_api'));

app.listen(port,()=>{
    console.log('Servidor en el puerto', port);
}); 