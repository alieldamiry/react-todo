import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { todoType } from "src/types";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState<todoType[]>([
    { id: 1, text: "cooking" },
    { id: 2, text: "playing" },
  ]);
  const addTodo = () => {
    const text = inputValue.trim();
    if (text.length > 0) {
      const newTodo = { id: new Date().getTime(), text };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setInputValue("");
    }
  };
  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    const updatedTodos = [...todos];
    updatedTodos.filter((todo) => todo.id === id)[0].text = text;
    setTodos(updatedTodos);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <div className="text-center">
      <h1>React Todo List</h1>
      <div className="mb-5">
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
          <input
            type="text"
            aria-label="todo-input"
            className="form-control flex-1"
            placeholder="add a new todo"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button type="submit">Add a todo</Button>
        </form>
      </div>
      {todos.length === 0 && <h2>your list is empty</h2>}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          removeTodo={removeTodo}
          todo={todo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default Todo;
