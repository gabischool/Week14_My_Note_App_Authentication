import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useGetNotesQuery, useUpdateNotesMutation } from "../store/api/NoteSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const EditNote = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data : notes = [] } = useGetNotesQuery();
  const [value , setValue] = useState({
    title :'',
    content :''
  })
  useEffect(()=>{
    const note = notes.find(note =>{
      return note.id === Number(params.id)
    })
    if(note){
      setValue({
        title : note.title,
        content :note.content
      })
    }
  },[notes , params.id])
  const [updateNote] = useUpdateNotesMutation();
  const initialValue = {
    title: value.title,
    content: value.content,
  }
  const ValidationSchema = Yup.object({
    title: Yup.string().required("enter your title note "),
    content: Yup.string().required("enter your content note ")
  })
  const handleSubmit = (values) => {
    console.log(values);
    updateNote({
      updateNote : values,
      id : Number(params.id)
    }).then(()=>{
      navigate('/');
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="mt-10 p-5 w-full lg:w-10/12 shadow-inner lg:mx-auto ">
      <p className="text-3xl p-3 my-3 text-slate-600">Edit notes </p>
      <div>
        <Formik
          enableReinitialize
          initialValues={initialValue}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-3">
            <Field className="p-3 text-base w-full rounded shadow" type="text" name="title" placeholder="Enter Note title " />
            <ErrorMessage name="title" component="div" className="text-red-500" />
            <Field className="p-3 text-base w-full rounded shadow" type="textarea" name="content" placeholder="Enter Note content" />
            <ErrorMessage name="content" component="div" className="text-red-500" />
            <button type="submit" className="p-3 text-base w-full rounded shadow bg-slate-600 text-white">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default EditNote