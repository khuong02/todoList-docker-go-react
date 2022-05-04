package routers

import (
	"net/http"
	"time"
	"todo-app/controllers"
	"todo-app/repositories/todorepo"
	"todo-app/services/todoservice"

	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	r = gin.New()
)

func Welcome(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to my todo app",
	})
}

func Router(client *mongo.Client) {
	todoRepo := todorepo.NewTodoRepo(client)

	todoService := todoservice.NewTodoService(todoRepo)

	todoCtl := controllers.NewTodoController(todoService)

	r.Use(cors.Middleware(cors.Config{
		Origins:         "http://localhost:3000",
		Methods:         "GET, PUT, POST, DELETE,PATCH",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "Content-Encoding",
		MaxAge:          50 * time.Second,
		Credentials:     false,
		ValidateHeaders: false,
	}))

	r.GET("/", Welcome)

	r.POST("/todo", todoCtl.PostTodo)
	r.GET("/todo", todoCtl.GetTodo)
	r.GET("/todo/:todoId", todoCtl.GetTodoById)
	r.PATCH("/todo/update", todoCtl.UpdateTodo)
	r.PATCH("/todo/update/:todoId", todoCtl.UpdateTodoById)
	r.DELETE("/todo/delete/:todoId", todoCtl.DeleteTodoById)

	r.Run()
}
