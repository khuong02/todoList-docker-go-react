import React, { useState } from "react";

import ListItemText from "@mui/material/ListItemText";
import { TextField } from "@mui/material";

const TodoText = ({ todo }) => {
  const [text, setText] = useState(todo.params);

  const handleChangeInput = ({ target }) => {
    setText(target.value);
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
