import { useCookies } from "react-cookie";
import useSWR from "swr";
import api from "../services/callApi";

function useAuth() {

    const [cookie, setCookie] = useCookies(["shop-token"])

    const { data } = useSWR(
        cookie["shop-token"] ? "user_me" : null,
        async () => {
            const res = await api.get("/user", {
                headers: {
                    authorization: cookie["shop-token"]
                }
            })

            return res.data
        }
    )

    return {
        userData: data,
    }
}

export default useAuth