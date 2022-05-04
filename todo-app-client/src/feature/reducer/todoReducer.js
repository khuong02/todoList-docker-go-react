import { actions } from "../action/todoAction";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TODO: {
      return (state.todoList = [...action.todoList]);
    }
    case actions.UPDATE_TODO_ITEM: {
      const updatedTodoList = state.todoList.map((todoItem) =>
        todoItem.id === action.todoItemId
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      );
      return { todoList: updatedTodoList };
    }

    default:
      return state;
  }
};

export default reducer;
