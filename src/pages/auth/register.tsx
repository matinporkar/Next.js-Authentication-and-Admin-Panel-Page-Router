import { Formik, Form, Field, ErrorMessage } from 'formik'
import { NextPage } from 'next'
import * as Yup from 'yup'

interface RegisterFormValues {
    name: string,
    email: string,
    password: string
}

const Register: NextPage = () => {

    const initialValues: RegisterFormValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("پر کردن این فیلد الزامیه"),
        email: Yup.string().email("یک ایمیل معتبر وارد کن").required("پر کردن این فیلد الزامیه"),
        password: Yup.string().min(6, "حداقل 6 کاراکتر الزامیه").required("پر کردن این فیلد الزامیه")
    })

    const registerFormHandler = (values: RegisterFormValues, actions) => {
        console.log(values)
        actions.resetForm()
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Register Form</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={registerFormHandler}
                    >
                        <Form className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">name : </label>
                                <Field className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition" name="name" type="text" />
                                <ErrorMessage className="text-xs text-red-500 mt-1" name="name" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">email : </label>
                                <Field className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition" name="email" type="email" />
                                <ErrorMessage className="text-xs text-red-500 mt-1" name="email" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">password : </label>
                                <Field className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition" name="password" type="password" />
                                <ErrorMessage className="text-xs text-red-500 mt-1" name="password" />
                            </div>

                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-60" type='submit'>Submit</button>

                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Register;