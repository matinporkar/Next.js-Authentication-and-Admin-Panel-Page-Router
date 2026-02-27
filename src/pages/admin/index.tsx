import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
// import AdminAuthLayout from "../../../app/components/layouts/auth/adminAuthLayout";
import AdminPanelLayout from "../../../app/components/layouts/adminPanel/adminPanelLayout";


const Dashboard: NextPageWithLayout = () => {
    // const [cookie, setCookie] = useCookies(["shop-token"])


    // const data = useSWR("user_me", () => {
    //     const user = async () => {
    //         const res = await api.get("/user", {
    //             headers: {
    //                 authorization: cookie["shop-token"]
    //             }
    //         })
    //     }
    // })


    return null
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminPanelLayout>{page}</AdminPanelLayout>
}

export default Dashboard;