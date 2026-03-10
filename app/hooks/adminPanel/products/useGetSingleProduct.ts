import { useRouter } from "next/router"
import { AxiosError } from "axios"
import { FormikHelpers } from "formik"
import { VerifyFormValues } from "../../../components/adninPanel/products/createProductForm/types"
import api from "../../../services/callApi"



export const useGetSingleProduct = (productid) => {

    const editProductFormHandler = async () => {

        const res = await api.get(`/products/${productid}`)

        return res?.data?.product
    }

    return { editProductFormHandler }
}