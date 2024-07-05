import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddTodoModal from './AddTodoModal';
import { useGetCategoriesQuery } from '../../api/categoryApi';
import TodoList from '../TodoList/TodoList';
import styles from './AllTodoLists.module.css';


const AllTodoLists = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: categories } = useGetCategoriesQuery();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className={styles['todos']}>
      <AddTodoModal show={showModal} onClose={handleCloseModal} categories={categories} />

      <div className={styles['add-todo']}>
        <h2>All My Todos</h2>
        <Button variant="primary" onClick={handleShowModal}>
            Add Todo
        </Button>
      </div>
        {categories?.map(category => (
          <TodoList key={category.id} category={category} />
        ))}
  </section>
  );
};

export default AllTodoLists;
