import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../../../app/components/shared/form/input'
import Link from 'next/link'
import api from '../../../app/services/callApi'
import Router from 'next/router'
import { AxiosError } from 'axios'
import { ReactElement } from 'react'
import AuthLayout from '../../../app/components/layouts/authLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { NextPage } from 'next'

interface RegisterFormValues {
    name: string,
    email: string,
    password: string
}

const Register: NextPage= () => {

    const initialValues: RegisterFormValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required()
    })

    const registerFormHandler = async (values: RegisterFormValues, actions) => {
        try {
            const res = await api.post("/auth/register", values)
            if (res.status == 201) {
                actions.resetForm()
                Router.push("/auth/login")
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
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Create Account</h1>

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

                    <p className="text-xs text-center text-gray-400 mt-6">
                        <Link href="/auth/phone/register"><span className="underline cursor-pointer">Register with phone number</span></Link>
                    </p>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        Already have an account? <Link href="/auth/login"><span className="underline cursor-pointer">Sign in</span></Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Register;