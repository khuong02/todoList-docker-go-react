package configs

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDatabase() *mongo.Client {
	config := GetConfig()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	// Set client options
	clientOptions := options.Client().ApplyURI(config.MongoDB.URI) // use env variables
	// Connect to MongoDB
	mongoDB, err := mongo.Connect(context.Background(), clientOptions)

	databases, _ := mongoDB.ListDatabaseNames(ctx, bson.M{})

	if err != nil {
		panic(err)
	}

	fmt.Println(databases)
	fmt.Println("Connected to MongoDB successfully!")

	return mongoDB
}
