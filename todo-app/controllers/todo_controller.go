package controllers

import (
	// "fmt"

	"net/http"
	"todo-app/models/todo"
	"todo-app/services/todoservice"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TodoListOutput struct {
	Todos []TodoOutput
}

type TodoOutput struct {
	Id     primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Params string             `json:"params"`
}

type TodoInput struct {
	Params string `json:"params"`
}

type TodoUpdate struct {
	Update map[string]string `json:"update"`
}

type TodoController interface {
	PostTodo(c *gin.Context)
	GetTodo(c *gin.Context)
	GetTodoById(c *gin.Context)
	UpdateTodo(c *gin.Context)
	UpdateTodoById(c *gin.Context)
	DeleteTodoById(c *gin.Context)
}

type todoController struct {
	ts todoservice.TodoService
}

func NewTodoController(ts todoservice.TodoService) TodoController {
	return &todoController{ts: ts}
}

func (ctl *todoController) PostTodo(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var todoInput TodoInput

	if err := c.ShouldBindJSON(&todoInput); err != nil {
		HTTPRes(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	t := ctl.inputToTodo(todoInput)

	if _, err := ctl.ts.CreateTodo(&t); err != nil {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	todoOutput := ctl.mapToTodoOutput(&t)
	HTTPRes(c, http.StatusOK, "Create todo", todoOutput)
}

func (ctl *todoController) GetTodo(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var todoList todo.TodoList

	err := ctl.ts.GetTodoList(&todoList)

	if err != nil {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	// for _, todo := range todoList.Todos {
	// 	fmt.Println(todo)
	// }

	tl := ctl.mapToTodoListOutput(&todoList)

	HTTPRes(c, http.StatusOK, "List todo", tl)
}

func (ctl *todoController) GetTodoById(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var todo todo.Todo
	todoId := c.Param("todoId")

	if err := ctl.ts.GetTodoById(todoId, &todo); err != nil {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	t := ctl.mapToTodoOutput(&todo)
	HTTPRes(c, http.StatusOK, "Todo", t)
}

func (ctl *todoController) UpdateTodo(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var todoUpdate TodoUpdate

	if err := c.ShouldBindJSON(&todoUpdate); err != nil {
		HTTPRes(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	mapTodo := ctl.inputToTodoUpdate(todoUpdate)

	result, err := ctl.ts.UpdateTodo(mapTodo.Update)
	if err != nil {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	if result.MatchedCount == 0 {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	HTTPRes(c, http.StatusOK, "Update successfully!", nil)

}

func (ctl *todoController) UpdateTodoById(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var todo todo.Todo
	var todoUpdate TodoUpdate
	todoId := c.Param("todoId")

	if err := c.ShouldBindJSON(&todoUpdate); err != nil {
		HTTPRes(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	mapTodo := ctl.inputToTodoUpdate(todoUpdate)
	err := ctl.ts.UpdateTodoById(todoId, mapTodo.Update, &todo)

	if err != nil {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	HTTPRes(c, http.StatusOK, "Update successfully!", todo)
}

func (ctl *todoController) DeleteTodoById(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	todoId := c.Param("todoId")

	err := ctl.ts.DeleteTodoById(todoId)

	if err != nil {
		HTTPRes(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	result := map[string]bool{"success": true}

	HTTPRes(c, http.StatusOK, "Update successfully!", result)
}
