import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import * as Yup from 'yup'
import Link from 'next/link'
import Router from 'next/router'
import api from '../../../../app/services/callApi'
import Input from '../../../../app/components/shared/input'


interface RegisterFormValues {
    name: string,
    phone: string
}

const Register: NextPage = () => {

    const initialValues: RegisterFormValues = {
        name: "",
        phone: "09"
    }

    const phoneRegex = /^09\d{9}$/

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        phone: Yup.string().matches(phoneRegex, 'Phone number is not valid').required()
    })

    const registerFormHandler = async (values: RegisterFormValues, actions) => {
        const res = await api.post("/auth/register", values)
        if (res.status == 201) {
            actions.resetForm()
            Router.push("/auth/phone/login")
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

                            <Input labelTitle='phone' inputName='phone' Type='phone' errorName='phone' />

                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-60" type='submit'>Submit</button>

                        </Form>
                    </Formik>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        <Link href="/auth/register"><span className="underline cursor-pointer">Register with email address</span></Link>
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