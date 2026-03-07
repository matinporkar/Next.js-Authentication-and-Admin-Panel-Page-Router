import { Formik, Form } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../../app/hooks'
import { NextPage } from 'next'
import { useAuthGuard } from '../../../../app/hooks/auth/login-register-phone/phone-verify/useAuthGuard'
import { useClearTokenOnBack } from '../../../../app/hooks/auth/login-register-phone/phone-verify/useClearTokenOnBack'
import { useVerifyTimeout } from '../../../../app/hooks/auth/login-register-phone/phone-verify/useVerifyTimeout'
import { initialValues, validationSchema } from '../../../../app/components/auth/login-register-phone/phone-verify/verifyForm.config'
import { useVerifyPhone } from '../../../../app/hooks/auth/login-register-phone/phone-verify/useVerifyPhone'
import Input from '../../../../app/components/shared/form/input'


const VerifyPhone: NextPage = () => {

    const token = useAppSelector(state => state.auth.token)
    const router = useRouter()

    useAuthGuard(token)
    useClearTokenOnBack()
    useVerifyTimeout(router.pathname)

    const {loginFormHandler} = useVerifyPhone(token)


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