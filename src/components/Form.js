import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "yup";
import * as Yup from "yup";
import axios from "axios";
import { validateYupSchema } from "formik";

const userForm = ({ value, error, touched, stauts }) => {
  const [userForm, setUserForm] = usestate();
  useEffect(() => {
    // ask chris about the if statement and why we are spreading useform ad setting status in the arrey?
    if (status) {
      setUserForm([...userForm, status]);
    }
  }, [status]);
  return (
    <div classname="user-form">
      <Form>
        <Field type="text" name="name" placeholder="Enter Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="Enter Email" />

        <Field type="password" name="password" placeholder="Enter Password" />

        <label>
          Agree to Terms of Service
          <Field type="checkbox" name="I agree" />
        </label>
      </Form>
      <button>Submit</button>
      {userForm.map(users => (
        <ul key={users.id}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValue({ name, email, password, agree }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      agree: agree || true
    };
  }
});

validateSchema: Yup.object().shape({
  name: Yup.string().required("Email Required"),
  password: Yup.string()
    .min(8, "min of 8 characters needed")
    .required("Password Needed"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email Needed")
});

export default FormikUesrForm;
