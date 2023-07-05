import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAddNotesMutation } from "../store/api/NoteSlice";
import { useNavigate } from "react-router-dom";
const AddNote = () => {
  const [addNotes] = useAddNotesMutation();
  const navigate = useNavigate();
  const initialValue = {
    title: '',
    content: ''
  }
  const ValidationSchema = Yup.object({
    title: Yup.string().required("enter your title note "),
    content: Yup.string().required("enter your content note ")
  })
  const handleSubmit = (values) => {
    console.log(values);
    addNotes({
      title: values.title,
      content: values.content
    }).then(() => {
      navigate('/');
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="mt-10 p-5 w-full lg:w-10/12 shadow-inner lg:mx-auto ">
      <p className="text-3xl p-3 my-3 text-slate-600">Add notes </p>
      <div>
        <Formik
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

export default AddNote