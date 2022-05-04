package controllers

import "todo-app/models/todo"

func (ctl *todoController) inputToTodo(input TodoInput) todo.Todo {
	return todo.Todo{

		Params: input.Params,
	}
}

func (ctl *todoController) mapToTodoOutput(t *todo.Todo) *TodoOutput {
	return &TodoOutput{
		Id:     t.Id,
		Params: t.Params,
	}
}

func (ctl *todoController) mapToTodoListOutput(t *todo.TodoList) *TodoListOutput {
	todoList := make([]TodoOutput, len(t.Todos))

	for idx, todo := range t.Todos {
		todoList[idx] = *ctl.mapToTodoOutput(&todo)
	}

	return &TodoListOutput{
		Todos: todoList,
	}
}

func (ctl *todoController) inputToTodoUpdate(input TodoUpdate) TodoUpdate {
	return TodoUpdate{
		Update: input.Update,
	}
}
