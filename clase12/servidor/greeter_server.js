
var PROTO_PATH = '../protos/helloworld.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/* Conexion a la base de datos */
const mysqlConnection = require('./mysql_connection');

function addCaso(call, callback) {
  const query = 'INSERT INTO Caso (name,location,age,infected_type,state) VALUES ('+
  '\''+call.request.name+'\','+
  '\''+call.request.location+'\','+
  +call.request.age+','+
  '\''+call.request.infected_type+'\','+
  '\''+call.request.state+'\');';
  
  mysqlConnection.query(query, function(err, rows, fields) {
    if (err) throw err;
    callback(null, {message: 'Caso insertado en la base de datos'});
  });
}

function listarCasos(call) {
  //console.log(call.request);
  
  const query = 'SELECT name,location,age,infected_type,state FROM Caso;';

  mysqlConnection.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      call.write(data);
    }
    call.end();
  });
  
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {addCaso: addCaso,
    listarCasos:listarCasos});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
