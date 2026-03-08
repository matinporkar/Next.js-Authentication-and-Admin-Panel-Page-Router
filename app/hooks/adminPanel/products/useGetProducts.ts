import api from "../../../services/callApi"


export default async function useGetProducts ({page = 1 , per_page = 2}) {
    const res = await api.get(`/products?page=${page}&per_page=${per_page}`)

    return {
        products : res?.data?.data,
        total_page : res?.data?.total_page
    }
}