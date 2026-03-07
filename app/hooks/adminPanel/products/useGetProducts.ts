import api from "../../../services/callApi"


export default async function useGetProducts ({page = 1 , per_page = 15}) {
    const res = await api.get(`/products?page=${page}&per_page=${per_page}`)

    return res?.data?.data
}