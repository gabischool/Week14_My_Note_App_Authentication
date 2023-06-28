import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BaseQuery from "../../BaseQuery";
import Cookies from "js-cookie";
const getcookie = ()=>{
    return Cookies.set("token");
}
export const UserSlice = createApi({
    reducerPath : "userSlice",
    baseQuery : fetchBaseQuery({
        baseUrl : BaseQuery,
        prepareHeaders : (Headers)=>{
            const token = getcookie();
            if(token){
                Headers.set("authorization",`Bearer ${token}`);
            }
            return Headers
        }
    })
    ,
    endpoints : (builder)=>({
        getUser:builder.query({
            query:()=>({
                url : "user",
                method : "GET",
            })
        }),
    })
})

export const {useGetUserQuery} = UserSlice