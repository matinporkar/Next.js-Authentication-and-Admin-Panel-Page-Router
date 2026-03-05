import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Input from '../../../app/components/shared/form/input'
import Link from 'next/link'
import api from '../../../app/services/callApi'
import { useCookies } from 'react-cookie'
import Router from 'next/router'
import { AxiosError } from 'axios'
import { ReactElement } from 'react'
// import AuthLayout from '../../../app/components/layouts/authLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { NextPage } from 'next'

interface LoginFormValues {
    email: string,
    password: string
}

const Login: NextPage = () => {

    const [cookie, setCookie] = useCookies(["shop-token"])

    const initialValues: LoginFormValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const loginFormHandler = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const res = await api.post("/auth/login", values)
            if (res.status == 200) {
                actions.resetForm()
                setCookie("shop-token", res.data.token, {
                    "maxAge": 3600 * 24 * 30,
                    "domain": "localhost",
                    "path": "/",
                    "sameSite": "lax"
                })
                Router.push("/")
            }
        } catch (err) {
            const error = err as AxiosError<{ type: string; errors?: Record<string, string>; message?: string }>
            if (error.response?.data?.type === "ValidationError" && error.response.data.errors) {
                actions.setErrors(error.response.data.errors)
            } else {
                console.log("this is general error and it hasnt type for showing in form")
            }
        }
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
                        <Link href="/auth/phone/login"><span className="underline cursor-pointer">Login with phone number</span></Link>
                    </p>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        Dont have an account? <Link href="/auth/register"><span className="underline cursor-pointer">Create Account</span></Link>
                    </p>

                </div>
            </div>
        </>
    )
}

// Login.getLayout = function getLayout(page : ReactElement) {
//     return <AuthLayout mode="publicOnly">{page}</AuthLayout>
// }

export default Login;