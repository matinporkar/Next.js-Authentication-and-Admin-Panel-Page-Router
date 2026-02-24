import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "../../../app/components/layouts/authLayout";


const Dashboard : NextPageWithLayout = () => {
    return <h1>This is user dashboard</h1>
}

Dashboard.getLayout = function getLayout(page : ReactElement) {
    return <AuthLayout mode="protected">{page}</AuthLayout>
}

export default Dashboard;