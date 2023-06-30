import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 
import { useLoginMutation } from '../../store/api/authSlice';
import { useNavigate } from 'react-router-dom';

const  Login = () => {

  const navigate = useNavigate();

  const [  signIn ] =  useLoginMutation();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
      email: Yup.string().required('Title is required'),
     password: Yup.string().required('Content is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Send the data to the server (localhost:9000/create_note)
    console.log(values);
     signIn({
       email: values.email,
        password: values.password,
    });
    
    navigate("/")
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
              id="email"
              name="email"
              placeholder="enter ur email address"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
               type="password"
              name="password"
              placeholder="your password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-green-400 text-black font-bold p-4 rounded-lg hover:bg-blue-50"
          >
         Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
