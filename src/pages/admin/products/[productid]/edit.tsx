import { ReactElement } from "react";
import AdminPanelLayout from "../../../../../app/components/layouts/adminPanel/adminPanelLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useGetSingleProduct } from "../../../../../app/hooks/adminPanel/products/useGetSingleProduct";
import { EditSingleProduct } from "../../../../../app/components/adninPanel/products/editSingleProduct/editSingleProduct";
import useAdminAccess from "../../../../../app/hooks/adminPanel/useAdminAccess";


const EditProduct: NextPageWithLayout = ({ productid }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter()
    let show = false

    const access = useAdminAccess("edit_product")

    const { editProductFormHandler } = useGetSingleProduct(productid)

    const { data, error } = useSWR({ url: `/admin/products/${productid}/edit`, productid }, editProductFormHandler)
    const isLoading = !data && !error

    if (!isLoading && data === undefined) {
        router.push("/admin/products")
    } else {
        show = true
    }


    return (
        <>
            {
                !isLoading && show ?
                    access.length > 0 ? <>
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-semibold text-gray-900">ویرایش محصول</h1>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <EditSingleProduct data={data} productid={productid} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> 
                    : <div className="p-5"><span>اجازه ی دسترسی به این صفحه را ندارید.</span></div> 
                : <span>در حال دزیافت اطلاعات محصول...</span>
            }
        </>
    )
}


EditProduct.getLayout = function getLayout(page: ReactElement) {
    return <AdminPanelLayout>{page}</AdminPanelLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    return {
        props: {
            productid: query?.productid
        }
    }
}

export default EditProduct;