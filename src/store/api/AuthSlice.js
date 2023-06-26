import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from './BaseUrl'
import Cookies from 'js-cookie'

const setToken = (token) => {
    Cookies.set("token", token, { expires: 1});
}

export const authSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["user"],

    endpoints: (builder) => ({

        // register 
        register: builder.mutation({
            query: (newUser) => ({
                url: "register",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["user"],
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const result = await queryFulfilled
                    setToken(result.data.token)
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        // login 
        login: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["user"],
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const result = await queryFulfilled
                    setToken(result.data.token)
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const { useRegisterMutation, useLoginMutation} = authSlice

export default authSlice.reducer