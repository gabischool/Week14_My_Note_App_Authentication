import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./Base_url";
import Cookies from "js-cookie";

const getCookie = () => {
  return Cookies.get("token"); 
   
};
console.log(getCookie());

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (Headers)=>{
        const  token = getCookie();
        // console.log("token", Headers.get("token"));
        if(token) 
        {
             Headers.set("Authorization", `Bearer ${token}`);
        }
       return Headers;
       ///beere waa habka aad ku hubinaysid qofkaan qofka yahay int aanan waxba lasiinin
    }
}),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      
      }),
    }),
  }),
});

export const {  useGetUserQuery } = userSlice;
export default userSlice.reducer;
