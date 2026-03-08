import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import AdminPanelLayout from "../../../../app/components/layouts/adminPanel/adminPanelLayout";
import Modal from "../../../../app/components/shared/modal";
import { useRouter } from "next/router";
import CreateProductForm from "../../../../app/components/adninPanel/products/createProductForm/createProductForm";
import useSWR from "swr";
import useGetProducts from "../../../../app/hooks/adminPanel/products/useGetProducts";
import ReactCustomPaginate from "../../../../app/components/shared/reactCutsomPaginate";
import ProductListItem from "../../../../app/components/adninPanel/products/productListItem/productListItem";


const Products: NextPageWithLayout = () => {

    const [page, setPage] = useState(1)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

    const router = useRouter()
    const { page: queryPage } = router.query

    const { data, error } = useSWR({ url: "/admin/products", page }, useGetProducts)
    const loadingProducts = !data && !error

    useEffect(() => {
        if (queryPage !== undefined) {
            setPage(parseInt(queryPage))
        }
    }, [queryPage])

    const setShowCreateProduct = (show: boolean) => {
        router.push(`/admin/products${show ? "?create-product" : ""}`)
    }

    const onPageChangeHandler = ({ selected }: { selected: number }) => router.push(`/admin/products?page=${selected + 1}`)


    return (
        <>

            {
                "create-product" in router.query &&
                <Modal setShow={() => setShowCreateProduct(false)}>
                    <div className="inline-block w-full max-w-3xl mt-8 mb-20 overflow-hidden text-right align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
                        <h2 className="text-xl font-bold leading-tight text-gray-800 py-5 px-7  border-b">ساخت محصول</h2>
                        <CreateProductForm setShow={() => setShowCreateProduct(false)} />
                    </div>
                </Modal>
            }

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">لیست محصولات</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            در این صفحه لیست محصولات وبسایت به شما نمایش داده می‌شود
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
                        <button
                            onClick={() => setShowCreateProduct(true)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            اضافه کردن محصول
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

                                {
                                    loadingProducts
                                        ? <div className="p-5"><span> در حال دریافت اطلاعات...</span></div>
                                        : data?.products.length > 0
                                            ? <table className="min-w-full divide-y divide-gray-300">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6">
                                                            شماره محصول
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                                            عنوان
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {data?.products.map((product) => <ProductListItem key={product.id} product={product} />)}
                                                </tbody>
                                            </table>
                                            : <div className="p-5"><span>محصولی وجود ندارد.</span></div>
                                }

                                {
                                    data?.total_page > 1 &&
                                    <div className="p-4 mt-2 border-t border-gray-200">
                                        <ReactCustomPaginate
                                            onPageChangeHandler={onPageChangeHandler}
                                            pageCount={data?.total_page}
                                            page={page}
                                        />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

Products.getLayout = function getLayout(page: ReactElement) {
    return <AdminPanelLayout>{page}</AdminPanelLayout>
}

export default Products;