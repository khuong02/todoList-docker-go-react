package todorepo

import (
	"context"
	"errors"
	"time"
	"todo-app/models/todo"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repo interface {
	CreateTodo(todo *todo.Todo) (*todo.Todo, error)
	GetTodoList(todos *todo.TodoList) error
	GetTodoById(todoId string, todo *todo.Todo) error
	UpdateTodo(update map[string]string) (*mongo.UpdateResult, error)
	UpdateTodoById(todoId string, update map[string]string, todo *todo.Todo) error
	DeleteTodoById(todoId string) error
}

type todoRepo struct {
	db *mongo.Client
}

// var collection mongo.Collection = configs.GetCol

func NewTodoRepo(db *mongo.Client) Repo {
	return &todoRepo{
		db: db,
	}
}

func (t *todoRepo) CreateTodo(todo *todo.Todo) (*todo.Todo, error) {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	collection := t.db.Database("todo-list").Collection("todo")

	result, err := collection.InsertOne(ctx, *todo)

	if err != nil {
		return nil, err
	}

	if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
		todo.Id = oid
	} else {
		return nil, errors.New("Create todo failed!")
	}

	return todo, nil
}

func (t *todoRepo) GetTodoList(todos *todo.TodoList) error {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	collection := t.db.Database("todo-list").Collection("todo")
	// opts := options.Find()

	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		return err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var todo todo.Todo
		if err = cursor.Decode(&todo); err != nil {
			return err
		}
		todos.Todos = append(todos.Todos, todo)
	}

	// if err = cursor.All(context.TODO(), &todos.Todos); err != nil {
	// 	log.Fatal(err)
	// }

	return nil
}

func (t *todoRepo) GetTodoById(todoId string, todo *todo.Todo) error {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	objId, _ := primitive.ObjectIDFromHex(todoId)

	collection := t.db.Database("todo-list").Collection("todo")

	if err := collection.FindOne(ctx, bson.M{"_id": objId}).Decode(&todo); err != nil {
		return err
	}

	return nil
}

func (t *todoRepo) UpdateTodo(update map[string]string) (*mongo.UpdateResult, error) {
	// ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	collection := t.db.Database("todo-list").Collection("todo")

	f := bson.D{{update["filter"], update["filterContext"]}}
	u := bson.D{{"$set", bson.D{{update["name"], update["context"]}}}}

	result, err := collection.UpdateMany(context.TODO(), f, u)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (t *todoRepo) UpdateTodoById(todoId string, update map[string]string, todo *todo.Todo) error {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	objId, _ := primitive.ObjectIDFromHex(todoId)

	collection := t.db.Database("todo-list").Collection("todo")

	u := bson.D{{"$set", bson.D{{update["name"], update["context"]}}}}

	upsert := true
	after := options.After

	opt := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
		Upsert:         &upsert,
	}

	result := collection.FindOneAndUpdate(ctx, bson.M{"_id": objId}, u, &opt)
	if result.Err() != nil {
		return result.Err()
	}

	result.Decode(&todo)

	return nil
}

func (t *todoRepo) DeleteTodoById(todoId string) error {
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	objId, _ := primitive.ObjectIDFromHex(todoId)

	collection := t.db.Database("todo-list").Collection("todo")

	// time := time.Millisecond

	// opt := options.FindOneAndDeleteOptions{
	// 	MaxTime: &time,
	// }

	result := collection.FindOneAndDelete(ctx, bson.M{"_id": objId}, nil)

	if result.Err() != nil {
		return result.Err()
	}

	return nil
}
