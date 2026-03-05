import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import AdminPanelLayout from "../../../app/components/layouts/adminPanel/adminPanelLayout";


const Dashboard: NextPageWithLayout = () => {
    return null
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminPanelLayout>{page}</AdminPanelLayout>
}

export default Dashboard;