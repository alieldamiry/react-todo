import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { todoType } from "src/types";

interface propTypes {
  editTodo: (id: number, text: string) => void;
  todo: todoType;
}
const EditModal: React.FC<propTypes> = ({ editTodo, todo }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(todo.text);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShow(false);
    editTodo(todo.id, inputValue);
  };

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        size="sm"
        className="mx-1"
        data-testid="edit-btn"
      >
        <BsPencilSquare />
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} data-testid="edit-form">
          <Modal.Body>
            <input
              type="text"
              aria-label="todo-input-edit"
              className="form-control flex-1"
              placeholder="add a new todo"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
