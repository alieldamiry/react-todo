import React from "react";
import { todoType } from "src/types";

interface propTypes {
  todo: todoType;
  addTodo: (text: string) => void;
}
const TodoItem: React.FC<propTypes> = ({ todo }) => {
  const { text } = todo;
  return <div>{text}</div>;
};

export default TodoItem;
