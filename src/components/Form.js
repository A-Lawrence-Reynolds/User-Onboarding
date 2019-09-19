import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ value, errors, touched, status }) => {
  const [userForm, setUserForm] = useState();
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
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field type="password" name="password" placeholder="Enter Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label>
          Agree to Terms of Service
          <Field type="checkbox" name="I agree" checked={value.agree} />
        </label>
        <button>Submit</button>
      </Form>

      {userForm.map(users => (
        <ul key={users.id}>
          <li>{users.name}</li>
          <li>{users.password}</li>
          <li>{users.email}</li>
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
  },

  validateSchema: Yup.object().shape({
    name: Yup.string().required("Email Required"),
    password: Yup.string()
      .min(8, "min of 8 characters needed")
      .required("Password Needed"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email Needed")
  }),

  handlesubmit(value, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", value)
      .then(res => {
        setStatus(res.data);
      })
      .catch(error => console.log(error.res));
  }
})(UserForm);
export default UserForm;
