import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "../../../app/components/layouts/authLayout";
import UserInfo from "../../../app/components/userPanel/userInfo";


const Dashboard: NextPageWithLayout = () => {

    return (

        <div>
            <UserInfo />
        </div>
        
    )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout mode="protected">{page}</AuthLayout>
}

export default Dashboard;