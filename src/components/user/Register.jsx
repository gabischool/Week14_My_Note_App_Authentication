import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../store/api/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [ register, { error = {}}] = useRegisterMutation();

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values) => {
    register({
      name: values.name,
      email: values.email,
      password: values.email
    }).unwrap().then(() => {
      navigate("/");
      window.location.reload()
    })
    
  };

  console.log("Register Error", error)

  return (
    <div className="bg-white p-10 rounded-lg mt-4 shadow md:w-3/4 mx-auto lg:w-1/2">
        <h3 className="text-3xl text-[#00BEFE] font-bold mb-5">Register</h3>
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
              placeholder="Name"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>

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
            className="block w-full bg-[#00BEFE] text-slate-900 font-bold p-4 rounded-lg hover:bg-[#00b2ff]"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;