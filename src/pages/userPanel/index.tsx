import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "../../../app/components/layouts/authLayout";
import UserInfo from "../../../app/components/userPanel/userInfo";
import { NextPage } from "next";


const Dashboard: NextPage = () => {

    return (

        <div>
            <UserInfo />
        </div>
        
    )
}

// Dashboard.getLayout = function getLayout(page: ReactElement) {
//     return <AuthLayout mode="protected">{page}</AuthLayout>
// }

export default Dashboard;