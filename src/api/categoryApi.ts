import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../types/Category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Categories']
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
