
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './BaseUrl'
import Cookies from 'js-cookie'

const setToken = (token) => {
    Cookies.set('token', token, { expires: 7 })
};



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
            
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    const { token } = result.data;
                    setToken(result.data.token);
                    } catch (err) {
                    console.log(err);
                }
            }
        }),
    }),
})

        
export const {useRegisterMutation,useLoginMutation } = authSlice;
export default authSlice.reducer;