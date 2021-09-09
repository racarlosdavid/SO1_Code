#FROM node:alpine3.11
FROM node
WORKDIR /nodejs_api
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENV MONGO_URL mongodb://cosmosdb-mongo-so1:gBfGBuwGNffYYuuuK3CaEoNKXPqdT9w8Gh45ELsKGiscYZrMXKZY5yxGWsqXWfa6TxQIsvUrPQbO2yfKno9ehA==@cosmosdb-mongo-so1.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdb-mongo-so1@
EXPOSE 3001 
CMD ["npm","start"]