package app

import (
	"log"
	"todo-app/configs"
	"todo-app/routers"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	r = gin.Default()
)

func App() {

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	client := configs.ConnectDatabase()

	routers.Router(client)

}
