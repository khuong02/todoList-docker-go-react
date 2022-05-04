import "./App.css";

import TodoApp from "./todo/TodoApp";
import TodoContext from "./feature/todo/TodoContext";

function App() {
  return (
    <TodoContext>
      <div className="App">
        <TodoApp />
      </div>
    </TodoContext>
  );
}

export default App;
