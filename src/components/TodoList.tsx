import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddTodoModal from './AddTodoModal';
import TodoItem from './TodoItem';
import { useGetTodosQuery } from '../api/todoApi';


const TodoList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: todos, error, isLoading } = useGetTodosQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="todo-list">
    <Button variant="primary" onClick={handleShowModal}>
      Add Todo
    </Button>

    <AddTodoModal show={showModal} onClose={handleCloseModal} />

    <div>
      <h2>Todos</h2>
      {todos?.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  </div>
  );
};

export default TodoList;
