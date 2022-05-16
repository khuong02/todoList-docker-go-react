import React, { useEffect, useState } from "react";

import axios from "axios";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import FromInput from "../components/todo/formInput/FormInput";
import TodoList from "../components/todo/list/TodoList";
import FeatureTodo from "../components/todo/feature/FeatureTodo";

const FILTER_OPTION_ALL = "ALL";
const FILTER_OPTION_ACTIVE = "ACTIVE";
const FILTER_OPTION_COMPLETED = "COMPLETED";

const filterOptions = [
  { name: "All", isChecked: true },
  { name: "Active", isChecked: false },
  { name: "Completed", isChecked: false },
];

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState([]);
  const [option, setOption] = useState("All");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:9000/todo");

        setTodos(
          res.data.data.Todos.map((todo) => ({
            ...todo,
            isCompleted: false,
            isUpdate: false,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();
  }, []);

  useEffect(() => {
    setFilterTodo([...todos]);
  }, [todos]);

  useEffect(() => {
    const filterTodos = (state, bool) => {
      return state.filter((i) => i.isCompleted === bool);
    };

    const switchOptionFilter = (option) => {
      option = option.toUpperCase();
      switch (option) {
        case FILTER_OPTION_ACTIVE: {
          isCheckedFilter(FILTER_OPTION_ACTIVE);
          return setFilterTodo(filterTodos([...todos], false));
        }

        case FILTER_OPTION_COMPLETED: {
          isCheckedFilter(FILTER_OPTION_COMPLETED);
          return setFilterTodo(filterTodos([...todos], true));
        }

        default: {
          isCheckedFilter(FILTER_OPTION_ALL);
          return setFilterTodo([...todos]);
        }
      }
    };
    switchOptionFilter(option);
  }, [option, todos]);

  const handleChangeInput = ({ target }) => {
    setTodo(target.value);
  };

  const handleSubmitCreateTodo = async () => {
    try {
      const result = await axios.post("http://localhost:9000/todo", {
        params: todo,
      });
      setTodos([...todos, { ...result.data.data, isCompleted: false }]);
      setTodo("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && todo.trim() !== "") {
      handleSubmitCreateTodo();
    }
  };

  //isFeatureFunc is check isCompleted and isUpdate
  const isFeatureFunc = (todo, option) => {
    const isCheck = todo[option];
    const idx = todos.indexOf(todo);
    setTodos([
      ...todos.slice(0, idx),
      {
        ...todo,
        [option]: !isCheck,
      },
      ...todos.slice(idx + 1),
    ]);
  };

  const isCheckedFilter = (filter) => {
    filterOptions.map((item) => {
      item.isChecked = item.name.toUpperCase() === filter ? true : false;
      return item;
    });
  };

  const clearCompletedFunc = () => {
    setTodos(
      todos.map((item) => {
        if (item.isCompleted) item.isCompleted = false;

        return item;
      })
    );
  };

  return (
    <Stack sx={{ width: "min(50%,800px)" }} spacing={3}>
      <h1>TODO</h1>
      <FromInput
        handleChangeInput={handleChangeInput}
        todo={todo}
        handleSubmit={handleSubmitCreateTodo}
        handleKeyPress={handleKeyPress}
      />
      <Stack>
        <Paper
          elevation={5}
          sx={{
            backgroundImage:
              "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
          }}
        >
          <TodoList
            todos={filterTodo}
            isFeatureFunc={isFeatureFunc}
            setTodos={setTodos}
          />
          <FeatureTodo
            todos={filterTodo}
            filterOptions={filterOptions}
            setOption={setOption}
            clearCompletedFunc={clearCompletedFunc}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default TodoApp;
