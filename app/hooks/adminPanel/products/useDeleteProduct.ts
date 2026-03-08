import api from "../../../services/callApi"


export const useDeleteProduct = (productId , mutateProducts) => {

    const handleTrue = async () => {
        try {
            const res = await api.post(`/products/${productId}/delete`, {})
            if (res.status == 200) {
                await mutateProducts()
            }
        } catch (err) {
            alert(`متاسفانه مشکلی در حذف محصول وجود دارد : ${err}`)
        }
    }

    return { handleTrue }
}