import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./BaseUrl";
import Cookies from "js-cookie";

const setCookies = () => {
  return Cookies.get("token");
};

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,

    prepareHeaders: (Headers) => {
      const token = setCookies();
      if (token) {
        Headers.set("Authorization", `Bearer ${token}`);
      }
      return Headers;
    },
  }),
  tagTypes: ["Note"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => {
        return {
          url: "/notes",
          method: "GET",
        };
      },
      providesTags: ["Note"],
    }),
    addNote: builder.mutation({
      query: (newNote) => ({
        url: "/create_note",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation({
      query: ({ id, updatedNote }) => ({
        url: `update_note/${id}`,
        method: "PUT",
        body: updatedNote,
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `delete_note/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;
