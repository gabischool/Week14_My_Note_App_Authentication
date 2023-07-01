import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddNoteMutation } from "../store/api/NoteSlice";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const navigate = useNavigate();

  const [addNote] = useAddNoteMutation();

  const initialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    addNote({
      title: values.title,
      content: values.content,
    })
      .unwrap()
      .then(() => {
        navigate("/");
      });
    resetForm();
  };

  return (
    <div className="bg-white p-10 rounded-lg  md:w-3/4 mx-auto lg:w-1/2">
      <h2 className="text-center text-2xl mb-4">Add Note</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300  p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              name="content"
              placeholder="Description"
              className="border border-gray-300  p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-[#EAB308] text-slate-900 font-bold p-4 rounded-lg">
            Add Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNote;
