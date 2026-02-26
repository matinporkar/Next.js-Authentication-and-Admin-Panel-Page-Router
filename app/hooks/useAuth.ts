import { useCookies } from "react-cookie";
import useSWR from "swr";
import api from "../services/callApi";

function useAuth() {

    const { data , isLoading  } = useSWR("user_me",
        async () => {
            const res = await api.get("/user")

            return res.data
        },
        {
            revalidateOnFocus : false,
            shouldRetryOnError : false
        }
    )

    return {
        userData: data,
        isLoading
    }
}

export default useAuth