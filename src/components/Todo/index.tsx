import React, { useState } from "react";
import { todoType } from "src/types";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState<todoType[]>([
    { id: 1, text: "cooking" },
    { id: 2, text: "playing" },
  ]);
  const addTodo = (text: string) => {
    const newTodo = { id: new Date().getTime(), text };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  return (
    <div>
      <h1>React Todo List</h1>
      {todos.map((todo) => (
        <TodoItem key={todo.id} addTodo={addTodo} todo={todo} />
      ))}
    </div>
  );
};

export default Todo;
