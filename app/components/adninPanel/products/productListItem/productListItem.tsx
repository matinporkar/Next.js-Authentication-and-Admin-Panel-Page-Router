import { useState } from "react";
import DeleteConfirmation from "../../../shared/deleteConfimation";


export default function ProductListItem({ product }) {
    const [ showDeleteConfirmation , setShowDeleteConfirmation ] = useState<boolean>(false);

    const handleTrue = () => {console.log("deleted")}

    return (
            <tr>
                <td className="hidden">
                    {
                        showDeleteConfirmation && 
                        <DeleteConfirmation
                            title={`حذف محصول ${product?.title}`}
                            description="آیا از حذف محصول مورد نظر خود اطمینان دارید یا خیر؟ در صورت تایید اطلاعات قابل بازگشت نخواهد بود"
                            handleTrue={handleTrue}
                            handleCancel={() => setShowDeleteConfirmation(false)}
                        />
                    }
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {product.id}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.title}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 ml-4">
                        ویرایش
                    </a>
                    <button onClick={() => setShowDeleteConfirmation(true)} className="text-indigo-600 hover:text-indigo-900">
                        حذف
                    </button>
                </td>
            </tr>
    )
}