import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import * as Yup from 'yup'
import Input from '../../../app/components/shared/input'

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
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
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

                            <Input labelTitle='name' inputName='name' Type='text' errorName='name' />

                            <Input labelTitle='email' inputName='email' Type='email' errorName='email' />

                            <Input labelTitle='password' inputName='password' Type='password' errorName='password' />

                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-60" type='submit'>Submit</button>

                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Register;