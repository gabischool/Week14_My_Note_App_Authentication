import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../store/api/AuthSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [register] =useRegisterMutation();
  const navigate = useNavigate();
  const initialValue = {
    name: '',
    email: '',
    password : ''
  }
  const ValidationSchema = Yup.object({
    name: Yup.string().required("enter your name "),
    email: Yup.string().required("enter your email "),
    password: Yup.string().required("enter your password ")
  })
  const handleSubmit = (values) => {
    console.log(values);
    register({
      name: values.name,
      email: values.email,
      password : values.password
    }).then(() => { navigate('/Login')})
    .catch( (error) => {
      console.log(error)
    })
  }
  return (
    <div className="mt-10 w-full p-5 lg:w-5/12 shadow-inner lg:mx-auto ">
      <p className="text-3xl p-3 my-3 text-slate-600">Sign Up </p>
      <div>
        <Formik
          initialValues={initialValue}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-3 space-y-4">
            <Field className="p-3 text-base w-full rounded shadow" type="text" name="name" placeholder="Enter name" />
            <ErrorMessage name="name" component="div" className="text-red-500"/>
            <Field className="p-3 text-base w-full rounded shadow" type="textarea" name="email" placeholder="Enter email" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
            <Field className="p-3 text-base w-full rounded shadow" type="text" name="password" placeholder="Enter password" />
            <ErrorMessage name="password" component="div" className="text-red-500" />
            <button type="submit" className="p-3 text-base w-full rounded shadow bg-slate-600 text-white">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register