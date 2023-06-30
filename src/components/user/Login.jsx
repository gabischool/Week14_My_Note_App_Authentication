import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../../store/api/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [ login, { error = {}}] = useLoginMutation();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values) => {
    login({
      email: values.email,
      password: values.email
    }).then(() => {
        navigate("/")
    }).catch((error) => {
      console.log(error)
    })
    
  };

  console.log("Login Error", error)

  return (
    <div className="bg-white p-10 rounded-lg mt-4 shadow md:w-3/4 mx-auto lg:w-1/2">
        <h3 className="text-3xl text-[#00BEFE] font-bold mb-5">Login</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>

          <div className="mb-5">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-[#00BEFE] text-black font-bold p-4 rounded-lg hover:bg-[#00b2ff]"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;