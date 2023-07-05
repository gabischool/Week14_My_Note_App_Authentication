
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../store/api/AuthSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const initialValue = {
    email: '',
    password: ''
  }
  const ValidationSchema = Yup.object({
    email: Yup.string().required("enter your email "),
    password: Yup.string().required("enter your password ")
  })
  const handleSubmit = (values) => {
    login({
      email: values.email,
      password: values.password
    }).then(() => {
      navigate('/')
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="mt-10 p-5 w-full lg:w-5/12 shadow-inner lg:mx-auto ">
      <p className="text-3xl p-3 my-3 text-slate-600">Sign In </p>
      <div>
        <Formik
          initialValues={initialValue}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-3 space-y-4">
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

export default Login