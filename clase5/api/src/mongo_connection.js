const { MongoClient } = require("mongodb");

//const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017`;
const uri = `mongodb://pruebas-cosmo:PglXgbaWesG30bfuFRPliD48hK0PDuH0RMICBXmd0SMCh8mLbIB9efRveTtSHBSOhv3VnqhwVVDC3XKxmoye7w==@pruebas-cosmo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@pruebas-cosmo@`;

const client = new MongoClient(uri);

module.exports = client;
