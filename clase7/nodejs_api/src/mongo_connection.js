const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = `${process.env.MONGO_URL}`;

const client = new MongoClient(uri);

module.exports = client;