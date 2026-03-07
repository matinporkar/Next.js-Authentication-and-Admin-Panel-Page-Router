import { useRouter } from "next/router"
import { useAppDispatch } from "../../.."
import { VerifyFormValues } from "../../../../components/auth/login-register-phone/phone-verify/types"
import { FormikHelpers } from "formik"
import { clearToken } from "../../../../store/authSlice"
import { AxiosError } from "axios"
import api from "../../../../services/callApi"

export const useVerifyPhone = (token: string | null) => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const loginFormHandler = async (values: VerifyFormValues, actions: FormikHelpers<VerifyFormValues>) => {
        try {
            const finalValues = {
                ...values,
                token: token
            }
            const res = await api.post("/auth/login/verify-phone", finalValues)
            if (res.status == 200) {
                actions.resetForm()
                await fetch("/api/loginCookie", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token: res.data.user.token })
                })
                await router.replace("/")
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

    return {loginFormHandler}
}