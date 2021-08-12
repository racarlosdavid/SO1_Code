#FROM node:alpine3.11
FROM node
WORKDIR /api_clase4
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENV MONGO_USERNAME mongoadmin
ENV MONGO_PASSWORD mongo_pass
ENV MONGO_HOST localhost
EXPOSE 3000 
CMD ["npm","start"]