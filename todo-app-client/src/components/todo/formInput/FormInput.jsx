import React from "react";

import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TextField } from "@mui/material";

const FormInput = (props) => {
  const { handleChangeInput, handleSubmit, todo, handleKeyPress } = props;
  return (
    <FormControl
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
        // color: "#fff",
      }}
    >
      <TextField
        id="createTodo"
        onChange={handleChangeInput}
        onKeyPress={handleKeyPress}
        value={todo}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                children={<AddCircleOutlineIcon sx={{ fontSize: "35px" }} />}
                onClick={handleSubmit}
                title="Add todo"
              />
            </InputAdornment>
          ),
        }}
        placeholder="Create a new todo..."
        autoFocus={true}
        focused={false}
        // notched={true}
        // multiline={true}
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
    </FormControl>
  );
};

export default FormInput;
