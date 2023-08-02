import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddNoteMutation } from "../store/api/NoteSlice";
import { useNavigate } from "react-router-dom";

const AddNote = () => {

  const [addNote ] = useAddNoteMutation();
  const navigate = useNavigate();

 
  const initialValues = {
    title: '',
    content: '',
  };
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Send the data to the server (localhost:9000/create_note)
   
    addNote({
      title: values.title,
      content: values.content,
    }).unwrap().then(() => {
      navigate("/");
    }).catch((err) => {
      console.log(err);
    });

  // Reset the form after submission
  resetForm();

};

  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
      <div className="mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2">
      
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-5">
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="w-full rounded border border-gray-300 p-3 shadow"
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
                id="content"
                name="content"
                placeholder="content"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500"
              />
            </div>
            
          

            <button
              type="submit"
              className="mt-4 rounded-3xl bg-blue-400 px-12 py-3 text-white hover:bg-blue-500"
            >
              Add Note
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddNote;
