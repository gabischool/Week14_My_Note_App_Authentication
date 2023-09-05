import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "./BaseUrl";
import Cookies from "js-cookie";

const setCookies = (token) => {
  Cookies.set("token", token);
};

export const userAuth = createApi({
  reducerPath: "userAuth",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          console.log(result);
          setCookies(result.data.token);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation } = userAuth;
