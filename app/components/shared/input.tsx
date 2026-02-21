import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface InputProps {
    labelTitle: string,
    labelClass?: string,
    inputName: string,
    Type: string,
    inputClass?: string,
    errorName: string,
    errorClass?: string
}

const Input: FC<InputProps> = ({ labelTitle, labelClass, inputName, Type, inputClass, errorName, errorClass }) => {
    return (
        <div>
            <label className={ `1block text-sm font-medium text-gray-700 mb-1 ${labelClass ??  ' '} ` } >{labelTitle} : </label>
            <Field className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition ${inputClass ?? ' '}`} name={inputName} type={Type} />
            <ErrorMessage className={`text-xs text-red-500 mt-1 ${errorClass ?? ' '}`} name={errorName} component="p" />
        </div>
    )
}

export default Input;