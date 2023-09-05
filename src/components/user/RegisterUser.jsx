import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../../store/api/Auth";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [registerUser, { error = {} }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().required("email is required"),
    password: Yup.string().required("passwor is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Send the data to the server (localhost:9000/create_note)

    registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then(() => {
        navigate("/login");
      });

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
              placeholder="Youre Name"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-5">
            <Field
              name="email"
              type="email"
              placeholder="Enter email"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-5">
            <Field
              name="password"
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterUser;
