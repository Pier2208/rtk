import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/Todo'; // Define Todo type as per your structure
import { Category } from '../types/Category';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], Category>({
      providesTags: ['Todos'],
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
      invalidatesTags: ['Todos'],
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      invalidatesTags: ['Todos'],
      query: ({ id, ...updates }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteTodo: builder.mutation<void, string>({
      invalidatesTags: ['Todos'],
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;
