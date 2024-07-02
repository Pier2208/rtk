// src/components/AddTodoModal.tsx

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAddTodoMutation } from '../api/todoApi';
import { v4 as uuidv4 } from 'uuid';

interface AddTodoModalProps {
  show: boolean;
  onClose: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ show, onClose }) => {
  const [title, setTitle] = useState('');
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTodo({ id: uuidv4(), title, completed: false });
      setTitle(''); // Clear input after adding todo
      onClose(); // Close modal after adding todo
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Todo'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTodoModal;
