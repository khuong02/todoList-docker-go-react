import React from "react";

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemIcon from "@mui/material/ListItemIcon";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

import TodoText from "./todoText/TodoText";

const TodoList = (props) => {
  const { todos, isFeatureFunc, deleteTodo } = props;

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
              <TodoText todo={todo} />

              <ListItemIcon>
                <IconButton
                  onClick={() => isFeatureFunc(todo.id, "isUpdate")}
                  title="Fix todo"
                >
                  <BorderColorIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete todo"
                >
                  <DeleteIcon />
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
