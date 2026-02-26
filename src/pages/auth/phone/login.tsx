import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import Router from 'next/router'
import { AxiosError } from 'axios'
import api from '../../../../app/services/callApi'
import Input from '../../../../app/components/shared/input'
import { setToken } from '../../../../app/store/authSlice'
import { useAppDispatch } from '../../../../app/hooks'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import AuthLayout from '../../../../app/components/layouts/authLayout'
import { NextPage } from 'next'

interface LoginFormValues {
    phone: string,
}

const Login: NextPage = () => {

    const dispatch = useAppDispatch()

    const initialValues: LoginFormValues = {
        phone: "09"
    }

    const phoneRegex = /^09\d{9}$/

    const validationSchema = Yup.object({
        phone: Yup.string().matches(phoneRegex, 'Phone number is not valid').required()
    })

    const loginFormHandler = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const res = await api.post("/auth/login", values)
            if (res.status == 200) {
                actions.resetForm()
                dispatch(setToken(res.data.token))
                Router.push("/auth/phone/verifyPhone")
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

                            <Input labelTitle='phone' inputName='phone' Type='phone' errorName='phone' />

                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-60" type='submit'>Submit</button>

                        </Form>
                    </Formik>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        <Link href="/auth/login"><span className="underline cursor-pointer">Login with email address</span></Link>
                    </p>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        Dont have an account? <Link href="/auth/register"><span className="underline cursor-pointer">Create Account</span></Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Login;