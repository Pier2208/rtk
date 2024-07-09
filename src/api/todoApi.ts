import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/Todo'; // Define Todo type as per your structure
import { Category } from '../types/Category';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], Category>({
      providesTags: (_result, _error, category) => [{ type: 'Todos', id: category.id }],
      query: (category) => {
        return {
          url: '/todos',
          params: {
            category: category.id
          }
        }
      }
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: (_result, _error, todo) => {
        return [{ type: 'Todos', id: todo.category }]
      }
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      invalidatesTags: (_result, _error, todo) => {
        return [{ type: 'Todos', id: todo.category }]
      },
      query: ({ id, ...updates }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteTodo: builder.mutation<void, Todo>({
      invalidatesTags: (_result, _error, todo) => {
        return [{ type: 'Todos', id: todo.category }]
      },
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;
