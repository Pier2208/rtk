import { Todo } from '../../types/Todo';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../api/todoApi';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleCheckboxChange = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleDeleteClick = () => {
    deleteTodo(todo);
  };

  return (
    <div className={styles['todo-item']}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
      />
      <span className={todo.completed ? styles.completed : ''}>{todo.title}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default TodoItem;
