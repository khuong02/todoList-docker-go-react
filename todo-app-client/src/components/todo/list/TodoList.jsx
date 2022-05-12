import React, { useState } from "react";

import axios from "axios";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import TodoText from "./todoText/TodoText";

const TodoList = (props) => {
  const { todos, isFeatureFunc, setTodos } = props;
  const [textUpdate, setTextUpdate] = useState([]);

  const deleteTodo = async (id) => {
    try {
      setTodos(todos.filter((items) => items.id !== id));
      await axios.delete(`http://localhost:9000/todo/delete/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const update = (obj) => {
    setTextUpdate(obj);
  };

  const updateTodo = async (id) => {
    try {
      const params_update = textUpdate.find((obj) => obj.id === id);

      setTodos(
        todos.map((items) => {
          if (items.id === id) {
            items.params = params_update.text;
          }
          return items;
        })
      );

      await axios.patch(
        `http://localhost:9000/todo/update/${params_update.id}`,
        {
          update: {
            name: "params",
            context: params_update.text,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        maxHeight: "600px",
        overflowY: "auto",
        backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
      }}
    >
      <List>
        {todos.map((todo) => {
          return (
            <ListItem key={todo.id} sx={{ borderBottom: "1px solid #2f3248" }}>
              {!todo.isUpdate && (
                <ListItemIcon>
                  <IconButton
                    onClick={() => isFeatureFunc(todo.id, "isCompleted")}
                  >
                    {!todo.isCompleted ? (
                      <RadioButtonUncheckedIcon sx={{ fontSize: "35px" }} />
                    ) : (
                      <RadioButtonCheckedIcon
                        sx={{ fontSize: "35px" }}
                        color="success"
                      />
                    )}
                  </IconButton>
                </ListItemIcon>
              )}
              <TodoText
                todo={todo}
                update={update}
                isUpdate={todo.isUpdate}
                textUpdate={textUpdate}
              />

              <ListItemIcon>
                <IconButton
                  onClick={() => {
                    if (todo.isUpdate) {
                      updateTodo(todo.id);
                    }

                    isFeatureFunc(todo.id, "isUpdate");
                  }}
                  title={todo.isUpdate ? "Update" : "Fix todo"}
                >
                  {todo.isUpdate ? <CheckIcon /> : <BorderColorIcon />}
                </IconButton>
                <IconButton
                  onClick={() =>
                    !todo.isUpdate
                      ? deleteTodo(todo.id)
                      : isFeatureFunc(todo.id, "isUpdate")
                  }
                  title={todo.isUpdate ? "Cancel" : "Delete todo"}
                >
                  {todo.isUpdate ? <CancelIcon /> : <DeleteIcon />}
                </IconButton>
              </ListItemIcon>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default TodoList;
