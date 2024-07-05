import TodoItem from '../TodoItem/TodoItem';
import { useGetTodosQuery } from '../../api/todoApi';
import { handleError } from '../../lib/handleError';
import { Category } from '../../types/Category';
import styles from './TodoList.module.css';

interface TodoListProps {
  category: Category;
}

const TodoList = ({ category }: TodoListProps) => {
  const { data: todos, isError, error, isLoading } = useGetTodosQuery(category);

  if (isLoading) return <div>Loading...</div>;
  if (isError) handleError(error);

  return (
    <div className={styles['todo-list']}>
      <div>
        <h3>{category.name}</h3>
        {todos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
  </div>
  );
};

export default TodoList;
