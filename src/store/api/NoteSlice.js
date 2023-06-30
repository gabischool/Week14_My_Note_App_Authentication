import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './Base_url'
import Cookies from 'js-cookie';

const getCookie = () => {
   return Cookies.get("token");
  };

export const noteApi = createApi({
    reducerPath: 'noteApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL,
        prepareHeaders: (Headers)=>{
            const  token = getCookie();
            if(token) 
            {
                 Headers.set("Authorization", `Bearer ${token}`);
            }
           return Headers;
            
        }
    
    }),
    tagTypes: ['Note'],
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => `/notes`,
            providesTags: ['Note'],
        }),
        addNote: builder.mutation({
            query: (body) => ({
                url: `/create_note`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Note'],
        }),
        updateNote: builder.mutation({
            query: ({ id, updatedNote }) => ({
                url: `update_note/${id}`,
                method: 'PUT',
                body: updatedNote,
            }),
            invalidatesTags: ['Note'],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `delete_note/${id}`,
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
export default noteApi.reducer;
