package p

import (
	"fmt"
    "net/http"
    "log" 
	"encoding/json" 
	"context"
	"time" 
	"bytes"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MONGO_URL = "mongodb://cosmosdb-mongo-c8:qU6C9KaPIJ8DvEZ5VnueB7lAkFpnyuw9f2GOtU0PyasIXVVNVvsZWilXKaeJsXjn1JdkLPzy2rd20zpBWb9CNw==@cosmosdb-mongo-c8.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdb-mongo-c8@"

func SaveCF(w http.ResponseWriter, r *http.Request) {
	//PARCEO EL JSON QUE ME ENVIARON
	buf := new(bytes.Buffer)
    buf.ReadFrom(r.Body)
    str := buf.String()

	var doc interface{}
	err := bson.UnmarshalExtJSON([]byte(str), true, &doc)
	if err != nil {
		log.Fatal(err)
	}

	//CONEXION A LA BASE DE DATOS E INSERCION DE DATOS
	client, err := mongo.NewClient(options.Client().ApplyURI(MONGO_URL))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	collection := client.Database("Clase7").Collection("data")
	res, insertErr := collection.InsertOne(ctx, doc)
		if insertErr != nil {
			log.Fatal(insertErr)
		}
    fmt.Println(res);

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
   	w.Header().Set("Access-Control-Allow-Origin", "*")
   	//w.Write(data)
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: "Data alamecenada en la base de datos"})

}
