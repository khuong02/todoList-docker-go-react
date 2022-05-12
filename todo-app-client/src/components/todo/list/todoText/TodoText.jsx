import React, { useState, useEffect } from "react";

import ListItemText from "@mui/material/ListItemText";
import { TextField } from "@mui/material";

const TodoText = ({ todo, update, isUpdate, textUpdate }) => {
  const [text, setText] = useState(todo.params);

  useEffect(() => {
    if (!isUpdate) {
      setText(todo.params);
    }
  }, [isUpdate, todo.params]);

  const handleChangeInput = ({ target }) => {
    setText(target.value);
    if (textUpdate.find((obj) => obj.id === todo.id)) {
      textUpdate.map((obj) => {
        if (obj.id === todo.id) {
          obj.text = target.value;
        }
        return obj;
      });
    } else {
      update((curr) => [...curr, { id: todo.id, text: target.value }]);
    }
  };

  return (
    <>
      {todo.isUpdate ? (
        <TextField
          id="updateTodo"
          onChange={handleChangeInput}
          value={text}
          focused={false}
          autoFocus={true}
          sx={{
            // height: "55px",
            fontSize: "16px",
            paddingRight: 0,
            wordBreak: "break-all",
            // maxHeight: "auto",
            width: "100%",
            // color: "#fff",
          }}
        />
      ) : (
        <ListItemText
          primary={todo.params}
          sx={{
            textDecoration: `${todo.isCompleted ? "line-through" : "none"}`,
          }}
        />
      )}
    </>
  );
};

export default TodoText;
