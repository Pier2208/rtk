// src/components/AddTodoModal.tsx

import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAddTodoMutation } from '../../api/todoApi';
import { v4 as uuidv4 } from 'uuid';
import { handleError } from '../../lib/handleError';
import { Category } from '../../types/Category';

interface AddTodoModalProps {
  show: boolean;
  onClose: () => void;
  categories?: Category[];
}

const AddTodoModal = ({ show, onClose, categories }: AddTodoModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<number>(1);
  const [addTodo, { isLoading, isError, error }] = useAddTodoMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ id: uuidv4(), title, category, completed: false });
    setTitle('');
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* todo title */}
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          {/* todo category */}
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              required
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {isError && (
            <Alert variant="danger">
              {handleError(error)}
            </Alert>
          )}
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Todo'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTodoModal;
