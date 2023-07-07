import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,
    FastField,
} from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
    name: "",
    email: "",
    club: "",
    comments: "",
    address: "",
    social: {
        facebook: "",
        twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
    console.log("onSubmit", values);
    onSubmitProps.setSubmitting(false);
};

const validationSchema = Yup.object({
    name: Yup.string().required("Yup says Required"),
    email: Yup.string()
        .email("Yups says Invalid email format")
        .required("Yup says Required"),
    club: Yup.string().required("Yup says Required"),
    address: Yup.string().required("Yup says Required"),
});

// implementing validation using Field Level Validation
// const validateComments = (value) => {
//     let error;
//     if (!value) {
//         error = "Required";
//     }
//     return error;
// };

function NewYTForm() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount // boolean with default true value, which helps in disabling 'Submit' button when the page loads (Method-1)
            // validateOnChange={false} // stops formik from automatically running validation func on a 'onChange' event
            // this is can be done for 'onBlur, onMouseOver', etc
        >
            {/* passing everything in a formik component helps us access every sub-component as its child prop  */}
            {(formik) => {
                return (
                    <Form>
                        {/* <=> <form onSubmit={formik.handleSubmit}> */}
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <Field // <=> {...formik.getFieldProps("name")} // <=> onChange={formik.handleChange}, onBlur={formik.handleBlur}, value={formik.values.name}
                                type="text"
                                id="name"
                                name="name"
                            />
                            <ErrorMessage name="name" component={TextError} />
                            {/* <=> {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                    ) : null} */}
                        </div>
                        <div className="form-control">
                            <label htmlFor="email">E-Mail</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email">
                                {(error) => (
                                    <div className="error">{error}</div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className="form-control">
                            <label htmlFor="club">Club</label>
                            <Field type="text" id="club" name="club" />
                            <ErrorMessage name="club" component={TextError} />
                        </div>

                        {/* Field component is used to pass in the additional props */}
                        <div className="form-control">
                            <label htmlFor="comments">Comments</label>
                            <Field
                                component="textarea"
                                id="comments"
                                name="comments"
                                // validate={validateComments}
                            />
                            <ErrorMessage name="comments" />
                        </div>

                        {/* Render Props way*/}
                        {/* FastField component(for large number of input fields) */}
                        <div className="form-control">
                            <label htmlFor="address">Address</label>
                            <FastField name="address">
                                {(props) => {
                                    // console.log("Render Props", props);
                                    // const {field, form, meta} = props  {/* destructuring*/}
                                    return (
                                        <>
                                            <input
                                                type="text"
                                                id="address"
                                                {...props.field}
                                            />
                                            {props.meta.touched &&
                                            props.error ? (
                                                <>{props.meta.error}</>
                                            ) : null}
                                        </>
                                    );
                                }}
                            </FastField>
                            <ErrorMessage
                                name="address"
                                component={TextError}
                            />
                        </div>

                        {/* Nested Objects */}
                        <div className="form-control">
                            <label htmlFor="facebook">Facebook profile</label>
                            <Field
                                type="text"
                                id="facebook"
                                name="social.facebook"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="twitter">Twitter profile</label>
                            <Field
                                type="text"
                                id="twitter"
                                name="social.twitter"
                            />
                        </div>

                        {/* Arrays */}
                        <div className="form-control">
                            <label htmlFor="primaryPh">
                                Primary Phone Number
                            </label>
                            <Field
                                type="number"
                                id="primaryPh"
                                name="phoneNumbers[0]"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="secondaryPh">
                                Secondary Phone Number
                            </label>
                            <Field
                                type="number"
                                id="secondaryPh"
                                name="phoneNumbers[1]"
                            />
                        </div>

                        {/* FieldArray Component */}
                        <div className="form-control">
                            <label>List of Phone Numbers</label>
                            <FieldArray name="phNumbers">
                                {(fieldArrayProps) => {
                                    // console.log("Field Array Props", fieldArrayProps);
                                    // After console logging fieldArrayProps, we find out the various properties it posseses and hence extract them by destructring

                                    const { push, remove, form } =
                                        fieldArrayProps;
                                    const { values } = form;
                                    const { phNumbers } = values;

                                    return (
                                        <div>
                                            {phNumbers.map(
                                                (phNumber, index) => (
                                                    <div key={index}>
                                                        <Field
                                                            name={`phNumbers[${index}]`}
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                push("")
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    );
                                }}
                            </FieldArray>
                        </div>

                        {/* Manually triggering validation */}
                        {/* can be used to check if certain data aleady exists in database */}
                        <button
                            type="button"
                            onClick={() => formik.validateField("cmments")}
                        >
                            Validate Comments
                        </button>
                        <button
                            type="button"
                            onClick={() => formik.validateField("")}
                        >
                            Validate All
                        </button>
                        <br />
                        <button
                            type="button"
                            onClick={() => formik.setFieldTouched("cmments")}
                        >
                            Visit Comments
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                formik.setTouched({
                                    name: true,
                                    email: true,
                                    club: true,
                                    comments: true,
                                })
                            }
                        >
                            Validate All
                        </button>
                        <br />

                        <button
                            type="submit"
                            //disabled={!formik.isValid} //if the form is not valid, the button is disabled
                            //disabled={!(formik.dirty && formik.isValid)} // lets us disable 'Submit' button when the page loads (Method-2)
                            disabled={!formik.isValid || formik.isSubmitting} // disabling to prevent resubmission
                        >
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default NewYTForm;
