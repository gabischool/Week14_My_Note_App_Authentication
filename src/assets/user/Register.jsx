import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../store/api/authSlice';
import { useNavigate } from 'react-router-dom';

const   Register = () => {

  const navigate = useNavigate();
  const  [registration ] =   useRegisterMutation();

  const initialValues = {
    name: '',
     email: '',
    password: '',
    
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
 
  });

  const handleSubmit = (values, { resetForm }) => {
    // Send the data to the server (localhost:9000/create_note)
    console.log(values);
    registration({
      name: values.name,
      email: values.email,
      password: values.password,
     
    });
     navigate("/Login");

    // Reset the form after submission
    resetForm();
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
          <Field
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              type="Password"
              name="password"
              placeholder="enter your password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-green-400 text-black font-bold p-4 rounded-lg hover:bg-blue-50"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default  Register;
