import { ErrorMessage, Field, FieldProps } from "formik";
import { FC } from "react";

interface TextareaProps {
    labelTitle: string,
    labelClass?: string,
    textareaName: string,
    textareaClass?: string,
    rows?: number
    errorName: string,
    errorClass?: string
}

const Textarea: FC<TextareaProps> = ({ labelTitle, labelClass, textareaName, textareaClass, rows = 5, errorName, errorClass }) => {
    return (
        <div>
            <label className={`1block text-sm font-medium text-gray-700 mb-1 ${labelClass ?? ' '} `} >{labelTitle} : </label>
            <Field name={textareaName}>
                {
                    ({field , meta} : FieldProps) => (
                        <textarea
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition ${textareaClass ?? ' '}`}
                            rows={rows}
                            {...field}
                        />
                    )
                }
            </Field>
            <ErrorMessage className={`text-xs text-red-500 mt-1 ${errorClass ?? ' '}`} name={errorName} component="p" />
        </div>
    )
}

export default Textarea;