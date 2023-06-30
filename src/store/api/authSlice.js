import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./Base_url";
import Cookies from "js-cookie";

const setToken = (token)=>{
    return Cookies.set("token",token , { expires : 1 });
}
export const authSlice = createApi({
    reducerPath : "authApi",
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL
    })
    ,
    endpoints : (builder)=>({
        register:builder.mutation({
            query:(newUser)=>({
                url : "register",
                method : "POST",
                body : newUser
            })
        }),
        login:builder.mutation({
            query:(user)=>({
                url : "login",
                method : "POST",
                body :user
            }),
            onQueryStarted : async (arg,{queryFulfilled})=>{
                try{
                    const result = await queryFulfilled;
                    console.log("RESULT",result)

                    setToken(result.data.token);
                }
                catch( error){
                    console.log(error)
                }
            }
        }),
    })
})

export const {useLoginMutation , useRegisterMutation} = authSlice;
export default authSlice.reducer;

