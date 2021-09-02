#FROM node:alpine3.11
FROM node
WORKDIR /nodejs_api
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENV MONGO_URL mongodb://pruebas-cosmo:PglXgbaWesG30bfuFRPliD48hK0PDuH0RMICBXmd0SMCh8mLbIB9efRveTtSHBSOhv3VnqhwVVDC3XKxmoye7w==@pruebas-cosmo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@pruebas-cosmo@
EXPOSE 3001 
CMD ["npm","start"]