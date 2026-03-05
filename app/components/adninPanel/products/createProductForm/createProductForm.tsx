import { Form, Formik } from "formik";
import Input from "../../../shared/form/input";
import { CreateProductFormProps } from "./types";
import { initialValues, validationSchema } from "./verifyForm.config";
import Textarea from "../../../shared/form/textarea";
import SelectBox from "../../../shared/form/selectBox";


const CreateProductForm = ({ setShow }: CreateProductFormProps) => {

    const CreateProductFormHandler = (values) => {
        console.log(values)
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={CreateProductFormHandler}
        >
            {({ values, isSubmitting, setFieldValue }) => (
                <Form className="admin-panel-layout">
                    <div className="p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8">

                        <div className="sm:col-span-2">
                            <Input
                                labelTitle="نام محصول"
                                inputName="productName"
                                Type="text"
                                errorName="productName"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <SelectBox
                                labelTitle="دسته بندی"
                                selectBoxName="productCategory"
                                options={
                                    [
                                        { name: "جاوا اسکریپت", value: "JS" },
                                        { name: "ری اکت", value: "REACT" },
                                        { name: "تایپ اسکریپت", value: "TS" },
                                    ]
                                }
                                errorName="productCategory"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <Input
                                labelTitle="قیمت محصول"
                                inputName="productPrice"
                                Type="text"
                                errorName="productPrice"
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <Textarea
                                labelTitle="درباره محصول"
                                textareaName="aboutProduct"
                                errorName="aboutProduct"
                            />
                        </div>

                    </div>

                    <div className="p-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center">
                        <button
                            type="submit"
                            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 ">
                            ایجاد محصول
                        </button>
                        <button type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={setShow}>انصراف</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}


export default CreateProductForm;