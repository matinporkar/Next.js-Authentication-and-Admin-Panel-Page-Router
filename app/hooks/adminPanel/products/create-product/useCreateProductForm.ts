import { useRouter } from "next/router"
import api from "../../../../services/callApi"
import { AxiosError } from "axios"
import { VerifyFormValues } from "../../../../components/adninPanel/products/createProductForm/types"
import { FormikHelpers } from "formik"


export const useCreateProductForm = () => {

    const router = useRouter()
    const createProductFormHandler = async (values:VerifyFormValues , actions:FormikHelpers<VerifyFormValues>) => {
        try {
            const res = await api.post("/products/create", {
                ...values,
                body : values.aboutProduct,
                category : values.productCategory
            })
            if (res.status == 200) {
                actions.resetForm()
                router.push("/admin/products")
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

    return { createProductFormHandler }
}