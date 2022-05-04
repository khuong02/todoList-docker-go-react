import React from "react";
import todoReducer from "../reducer/todoReducer";
import { actions, initialState } from "../action/todoAction";

export const TodoContext = React.createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);

  const value = {
    todoList: state.todoList,
    updateTodoItem: (todoItemId) => {
      dispatch({ type: actions.UPDATE_TODO_ITEM, todoItemId });
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default Provider;
