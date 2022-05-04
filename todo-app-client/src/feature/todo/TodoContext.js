import React, { useEffect } from "react";

import axios from "axios";

import todoReducer from "../reducer/todoReducer";
import { actions, initialState } from "../action/todoAction";

export const TodoContext = React.createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:9000/todo");
        const todoList = res.data.data.Todos.map((todo) => ({
          ...todo,
          isCompleted: false,
          isUpdate: false,
        }));
        dispatch({ type: actions.SET_TODO, todoList });
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();
  }, []);

  const value = {
    todoList: state.todoList,
    updateTodoItem: (todoItemId) => {
      dispatch({ type: actions.UPDATE_TODO_ITEM, todoItemId });
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default Provider;
