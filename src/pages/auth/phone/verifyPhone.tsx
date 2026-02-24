import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import Router, { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import api from '../../../../app/services/callApi'
import Input from '../../../../app/components/shared/input'
import { useEffect, useState } from 'react'
import { clearToken } from '../../../../app/store/authSlice'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { NextPage } from 'next'

interface VerifyFormValues {
    code: string,
}


const VerifyPhone: NextPage = () => {

    const [cookies, setCookies] = useCookies(["shop-token"])

    const token = useAppSelector(state => state.auth.token)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!token && cookies["shop-token"]) {
            Router.replace("/userPanel")
        }
        else if (!token) {
            Router.replace("/auth/phone/login")
        }
    }, [token , cookies["shop-token"]])

    useEffect(() => {
        Router.beforePopState(() => {
            dispatch(clearToken())
            return true
        })
    })


    const router = useRouter()
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearToken())
            if (router.pathname == "/auth/phone/verifyPhone") {
                alert("Timed Out. Please Login Again")
            }
        }, 60000)
        return () => clearTimeout(timer)
    }, [])


    const initialValues: VerifyFormValues = {
        code: "",
    }


    const vodeRegex = /^\d{6}$/
    const validationSchema = Yup.object({
        code: Yup.string().matches(vodeRegex, 'Code number is not valid').required()
    })


    const loginFormHandler = async (values: VerifyFormValues, actions: FormikHelpers<VerifyFormValues>) => {
        try {
            const finalValues = {
                ...values,
                token: token
            }
            const res = await api.post("/auth/login/verify-phone", finalValues)
            if (res.status == 200) {
                actions.resetForm()
                setCookies("shop-token", res.data.user.token, {
                    "maxAge": 3600 * 24 * 30,
                    "domain": "localhost",
                    "path": "/",
                    "sameSite": "lax"
                })
                await Router.replace("/")
                dispatch(clearToken())
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

                            <Input labelTitle='enter the code' inputName='code' Type='text' errorName='code' />

                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-60" type='submit' >Submit</button>

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


export default VerifyPhone;