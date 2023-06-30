import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BaseQuery from "../../BaseQuery";
import Cookies from "js-cookie";
const setcookie = (token)=>{
    return Cookies.set("token",token , { expires : 1 });
}
export const AuthSlice = createApi({
    reducerPath : "authSlice",
    baseQuery : fetchBaseQuery({
        baseUrl : BaseQuery
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
            })
            ,
            onQueryStarted : async (arg,{queryFulfilled})=>{
                try{
                    const result = await queryFulfilled;
                    console.log("i alikey",result)

                    setcookie(result.data.token);
                }
                catch(err){
                    console.log(err)
                }
            }
        }),
    })
})

export const {useLoginMutation , useRegisterMutation} = AuthSlice