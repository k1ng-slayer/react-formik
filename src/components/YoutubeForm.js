import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
    name: "",
    email: "",
    club: "",
};

const onSubmit = (values) => {
    console.log("onSubmit", values);
};

// const validate = (values) => {
//     let errors = {}; // errors object has a structure of => {errors.name,errors.email,errors.club} which is similar to 'values'

//     if (!values.name) {
//         errors.name = "Required";
//     }

//     if (!values.email) {
//         errors.email = "Required";
//     } else if (
//         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//     ) {
//         errors.email = "Invalid email format";
//     }

//     if (!values.club) {
//         errors.club = "Required";
//     }

//     return errors;
// };

const validationSchema = Yup.object({
    name: Yup.string().required("Yup says Required"),
    email: Yup.string()
        .email("Yups says Invalid email format")
        .required("Yup says Required"),
    club: Yup.string().required("Yup says Required"),
});

function YoutubeForm() {
    const formik = useFormik({
        initialValues, // initialValues: initialValues,
        onSubmit, // onSubmit: onSubmit,
        // validate, // validate: validate,
        validationSchema, // validationSchema: validationSchema
    });
    // useFormik() takes an object(initialValues) as its parameter
    // useFormik() also takes properties such as 'onSubmit',

    // console.log("Formik Values", formik.values);
    // console.log("Formik Errors", formik.errors);
    console.log("Visited Fields", formik.touched);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="form-control">
                    <label htmlFor="club">Club</label>
                    <input
                        type="text"
                        id="club"
                        name="club"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.club}
                    />
                    {formik.touched.club && formik.errors.club ? (
                        <div className="error">{formik.errors.club}</div>
                    ) : null}
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default YoutubeForm;
