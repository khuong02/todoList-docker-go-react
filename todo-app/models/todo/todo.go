package todo

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Todo struct {
	Id     primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Params string             `json:"params" bson:"params"`
}

type TodoList struct {
	Todos []Todo
}
