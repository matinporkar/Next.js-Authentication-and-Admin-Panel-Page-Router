import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import api from "../../../app/services/callApi";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import AdminAuthLayout from "../../../app/components/layouts/adminAuthLayout";


const Dashboard: NextPageWithLayout = () => {
    const [cookie, setCookie] = useCookies(["shop-token"])


    const data = useSWR("user_me", () => {
        const user = async () => {
            const res = await api.get("/user", {
                headers: {
                    authorization: cookie["shop-token"]
                }
            })
        }
    })


    return <h1>This is user dashboard</h1>
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminAuthLayout>{page}</AdminAuthLayout>
}

export default Dashboard;