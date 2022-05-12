import React from "react";

import { Stack, Box } from "@mui/material";

const FeatureTodo = (props) => {
  const { todos, filterOptions, setOption, clearCompletedFunc } = props;
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        padding: "15px",
      }}
    >
      <Box>{todos.length} items left</Box>
      <Box>
        {filterOptions.map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => setOption(item.name)}
              style={{
                margin: "0 15px",
                color: `${item.isChecked ? "#c04659" : "#000"}`,
                cursor: "pointer",
              }}
            >
              {item.name}
            </span>
          );
        })}
      </Box>
      <Box>
        <span
          onClick={clearCompletedFunc}
          style={{
            cursor: "pointer",
          }}
        >
          Clear Completed
        </span>
      </Box>
    </Stack>
  );
};

export default FeatureTodo;
