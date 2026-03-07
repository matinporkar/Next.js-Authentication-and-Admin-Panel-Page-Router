import { ErrorMessage, Field, FieldProps } from "formik";
import { FC } from "react";

interface SelectBoxOptions {
    name: string,
    value: string
}

interface SelectBoxProps {
    labelTitle: string,
    labelClass?: string,
    selectBoxName: string,
    selectBoxClass?: string,
    options: SelectBoxOptions[],
    errorName: string,
    errorClass?: string
}

const SelectBox: FC<SelectBoxProps> = ({ labelTitle, labelClass, selectBoxName, selectBoxClass, options, errorName, errorClass }) => {
    return (
        <div>
            <label className={`1block text-sm font-medium text-gray-700 mb-1 ${labelClass ?? ' '} `} >{labelTitle} : </label>
            <Field name={selectBoxName}>
                {
                    ({ field, meta }: FieldProps) => (
                        <select
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition ${selectBoxClass ?? ' '}`}
                            {...field}
                        >
                            {
                                options.map((option:SelectBoxOptions, index) => (
                                    <option key={index} value={option.value} defaultValue={option.value}>{option.name}</option>
                                ))
                            }
                        </select>
                    )
                }
            </Field>
            <ErrorMessage className={`text-xs text-red-500 mt-1 ${errorClass ?? ' '}`} name={errorName} component="p" />
        </div>
    )
}

export default SelectBox;