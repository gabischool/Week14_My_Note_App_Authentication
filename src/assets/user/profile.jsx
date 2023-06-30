import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetUserQuery } from '../../store/api/userSlice';
 

const   Profile = () => {
  const { data: user={}  , error, isLoading}= useGetUserQuery();

   

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
       
       <p> Name: {user.name} </p>
       <p> Email: {user.email}</p>
      
    </div>
  );
};

export default Profile;
