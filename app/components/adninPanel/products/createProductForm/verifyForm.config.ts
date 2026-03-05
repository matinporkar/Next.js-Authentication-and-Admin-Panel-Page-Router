import * as Yup from 'yup'
import { VerifyFormValues } from "./types"

export const initialValues: VerifyFormValues = {
    productName: "",
    productPrice : 0,
    aboutProduct: ""
}

export const validationSchema = Yup.object({
    productName: Yup.string().required().min(4).max(225),
    productCategory: Yup.string().required(),
    productPrice: Yup.string().required().min(1).max(8),
    aboutProduct: Yup.string().required().min(4).max(6000)
})