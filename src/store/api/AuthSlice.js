import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './BaseUrl'
import Cookies from 'js-cookie'

const setToken = (token) => {
    Cookies.set("token", token, { expires: 1});
}
export const authSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL }),
    
    endpoints: (builder) => ({

       //Register
        register: builder.mutation({
            query: (newUser) => ({
                url: 'register',
                method: 'POST',
                body:newUser,
            }),
        
        }),
        // Login
        login: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
            onQueryStarted: async (arg, {queryFulfilled}) => {
                try {
                    const result = await queryFulfilled;
                    setToken(result.data.token)
                } catch (error) { 
                    console.log(error)
                }
            }
           
        }),
       
    }),
})

export const {
useRegisterMutation, useLoginMutation
} = authSlice;
export default authSlice.reducer;
