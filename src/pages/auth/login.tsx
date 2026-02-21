import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import * as Yup from 'yup'
import Input from '../../../app/components/shared/input'
import Link from 'next/link'

interface LoginFormValues {
    email: string,
    password: string
}

const Login: NextPage = () => {

    const initialValues: LoginFormValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const loginFormHandler = (values: LoginFormValues, actions) => {
        console.log(values)
        actions.resetForm()
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Sign In</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={loginFormHandler}
                    >
                        <Form className="space-y-5">

                            <Input labelTitle='email' inputName='email' Type='email' errorName='email' />

                            <Input labelTitle='password' inputName='password' Type='password' errorName='password' />

                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-60" type='submit'>Submit</button>

                        </Form>
                    </Formik>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        Dont have an account? <Link href="/auth/register"><span className="underline cursor-pointer">Create Account</span></Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Login;