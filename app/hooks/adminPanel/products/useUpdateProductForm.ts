import { useRouter } from "next/router"
import { AxiosError } from "axios"
import { FormikHelpers } from "formik"
import { VerifyFormValues } from "../../../components/adninPanel/products/createProductForm/types"
import api from "../../../services/callApi"


export const useUpdateProductForm = (productid) => {

    const router = useRouter()
    const updateProductFormHandler = async (values:VerifyFormValues , actions:FormikHelpers<VerifyFormValues>) => {
        try {
            const res = await api.post(`/products/${productid}/update`, {
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

    return { updateProductFormHandler }
}