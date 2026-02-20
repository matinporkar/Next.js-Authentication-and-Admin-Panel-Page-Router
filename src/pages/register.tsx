import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface RegisterFormValues {
    name: string,
    email: string,
    password: string
}

export default function Register() {

    const initialValues: RegisterFormValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        name : Yup.string().required("پر کردن این فیلد الزامیه"),
        email : Yup.string().email("یک ایمیل معتبر وارد کن").required("پر کردن این فیلد الزامیه"),
        password : Yup.string().min(6 , "حداقل 6 کاراکتر الزامیه").required("پر کردن این فیلد الزامیه")
    })

    const registerFormHandler = (values: RegisterFormValues , actions) => {
        console.log(values)
        actions.resetForm()
    }

    return (
        <>
            <div>
                <h1>Register Form</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={registerFormHandler}
                >
                    <Form>

                        <div>
                            <label>name : </label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name" />
                        </div>

                        <div>
                            <label>email : </label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" />
                        </div>

                        <div>
                            <label>password : </label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" />
                        </div>

                        <button type='submit'>Submit</button>

                    </Form>
                </Formik>
            </div>
        </>
    )
}