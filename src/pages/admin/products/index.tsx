import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import AdminPanelLayout from "../../../../app/components/layouts/adminPanel/adminPanelLayout";


const Products: NextPageWithLayout = () => {
    return null
}

Products.getLayout = function getLayout(page: ReactElement) {
    return <AdminPanelLayout pageName="Products">{page}</AdminPanelLayout>
}

export default Products;