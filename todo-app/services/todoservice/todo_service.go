package todoservice

import (
	"todo-app/models/todo"
	"todo-app/repositories/todorepo"

	"go.mongodb.org/mongo-driver/mongo"
)

type TodoService interface {
	CreateTodo(todo *todo.Todo) (*todo.Todo, error)
	GetTodoList(todos *todo.TodoList) error
	GetTodoById(todoId string, todo *todo.Todo) error
	UpdateTodo(update map[string]string) (*mongo.UpdateResult, error)
	UpdateTodoById(todoId string, update map[string]string, todo *todo.Todo) error
	DeleteTodoById(todoId string) error
}

type todoService struct {
	Repo todorepo.Repo
}

func NewTodoService(repo todorepo.Repo) TodoService {
	return &todoService{
		Repo: repo,
	}
}

func (ts *todoService) CreateTodo(todo *todo.Todo) (*todo.Todo, error) {
	return ts.Repo.CreateTodo(todo)
}

func (ts *todoService) GetTodoList(todos *todo.TodoList) error {
	return ts.Repo.GetTodoList(todos)
}

func (ts *todoService) GetTodoById(todoId string, todo *todo.Todo) error {
	return ts.Repo.GetTodoById(todoId, todo)
}

func (ts *todoService) UpdateTodo(update map[string]string) (*mongo.UpdateResult, error) {
	return ts.Repo.UpdateTodo(update)
}

func (ts *todoService) UpdateTodoById(todoId string, update map[string]string, todo *todo.Todo) error {
	return ts.Repo.UpdateTodoById(todoId, update, todo)
}

func (ts *todoService) DeleteTodoById(todoId string) error {
	return ts.Repo.DeleteTodoById(todoId)
}
