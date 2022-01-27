import React from "react";
import { Button } from "react-bootstrap";
import { todoType } from "src/types";
import classes from "./styles.module.css";
import { BsTrashFill } from "react-icons/bs";
import EditModal from "./EditModal";

interface propTypes {
  todo: todoType;
  removeTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
}
const TodoItem: React.FC<propTypes> = ({ todo, removeTodo, editTodo }) => {
  const { text } = todo;
  return (
    <div data-testid="todo-item" className={classes.todoItem}>
      <div>{text}</div>
      <div>
        <EditModal editTodo={editTodo} todo={todo} />
        <Button
          size="sm"
          className="mx-1"
          data-testid="remove-btn"
          variant="danger"
          onClick={() => removeTodo(todo.id)}
        >
          <BsTrashFill />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
