import * as Yup from 'yup'
import { VerifyFormValues } from "../../../../components/auth/login-register-phone/phone-verify/types"

export const initialValues: VerifyFormValues = {
    code: "",
}

const vodeRegex = /^\d{6}$/
export const validationSchema = Yup.object({
    code: Yup.string().matches(vodeRegex, 'Code number is not valid').required()
})