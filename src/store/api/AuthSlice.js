
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './BaseUrl'

export const authSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL
     }),
  
    endpoints: (builder) => ({

        // fetch Notes

        register: builder.mutation({
            query: (newUser) => {
                return {
                    url: '/register',
                    method: 'POST',
                    body: newUser,
                };
            },
            
        }),

        // login

        login: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
            

        }),
    }),
})

        
export const {useRegisterMutation,useLoginMutation } = authSlice;
export default authSlice.reducer;