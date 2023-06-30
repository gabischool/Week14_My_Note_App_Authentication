import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../../store/api/AuthSlice';

const Register = () => {

  const [ register ] = useRegisterMutation();

  
  const navigate = useNavigate();
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

  const handleSubmit = (values) => {
    // Send the data to the server (localhost:9000/create_note)
    console.log(values);
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    }).unwrap().then(()=> {
        navigate("/");
    })
  };

  return  (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
      <div className="mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2">
        <h4 className="mb-10 text-2xl font-bold">Register</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-5">
            </div>
            <div className="mb-5">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
         
            <button
              type="submit"
              className="mt-4 rounded-3xl bg-red-400 px-12 py-3 text-white hover:bg-red-500"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
   
};

export default Register;
