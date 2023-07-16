import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

export const baseUrl = import.meta.env.VITE_BASE_LINK;

const getToken = () => {
    return Cookies.get("token");
  };

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }, 
    }),
    tagTypes: ['Note'],

    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => '/notes',
            providesTags: ['Note'],
        }),
        addNote: builder.mutation({
            query: (body) => ({
                url: '/create_note',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Note'],
        }),
        updateNote: builder.mutation({
            query: ({ id, updatedNote }) => ({
                url: `/update_note/${id}`,
                method: 'PUT',
                body: updatedNote,
            }),
            invalidatesTags: ['Note'],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/delete_note/${id}`,
                method: 'DELETE',
            }), 
            invalidatesTags: ['Note'],
        }),
    }),
})

export const {
    useGetNotesQuery,
    useAddNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = noteApi
