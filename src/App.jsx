import { useState } from "react";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [todoList, setTodoList] = useState([]);

  //Add Todo

  const addTodo = (todo) => {
    const newTodo = {
      title: todo,
      isCompleted: false,
      id: Math.random() * 1000,
    };
    setTodoList((prev) => [...prev, newTodo]);

    setInputVal("");
  };

  //Delete Todos
  const deleteTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  //Complete Todo
  const completeTodo = (id, isCompleted) => {
    const completedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !isCompleted };
      } else {
        return todo;
      }
    });
    setTodoList(completedTodoList);
  };
  //Edit Todo

  const editTodo = (index, newTitle) => {
    const editedTodoList = [...todoList];
    editedTodoList[index] = { ...todo, title: newTitle };
    setTodoList(editedTodoList);
  };

  return (
    <main>
      {/* Dispaly Todos  */}
      <section className="todos">
        <header className="header">
          <div className="logo">
            <i class="bi bi-list-task"></i>
          </div>
          <div className="header-title">
            <h3>Todo App</h3>
          </div>
        </header>
        {todoList.map((todo, index) => {
          return (
            <div
              key={index}
              className={todo.isCompleted === true ? "completed todo" : "todo"}
            >
              <div className="todo-right">
                <input
                  type="checkbox"
                  className="check-box"
                  value={todo.isCompleted}
                  onChange={() => completeTodo(todo.id, todo.isCompleted)}
                />
                <p className="todo-title">{todo.title}</p>
              </div>
              <div className="todo-left">
                <button
                  className="edit-btn"
                  onClick={() =>
                    editTodo(index, prompt("Edit Your Todo", todo.title))
                  }
                >
                  <i class="bi bi-pen"></i>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Add Todo  */}
      <form
        className="addTodo"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(inputVal);
        }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          name="todo"
          id="todo"
          autoComplete="off"
          autoFocus
          placeholder="New Task..."
        />
        <button type="submit">ADD TASK</button>
      </form>
    </main>
  );
}

export default App;
