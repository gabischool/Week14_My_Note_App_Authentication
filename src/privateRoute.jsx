import React from 'react';
 import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';


const  PrivateRoute = () => {

   const token = Cookies.get('token');
   if (!token) {
    return < Navigate to ="/login"/>
   }
  return  <Outlet/>;
};

export default PrivateRoute;