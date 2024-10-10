import { useDispatch } from "react-redux";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "The login must contain at least 2 characters")
    .max(20, "The login must contain a maximum of 20 characters")
    .trim("There should be no spaces")
    .required("Required!"),
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string()
    .min(7, "The password must contain at least 7 characters")
    .matches(/[A-Z]/, "The password must contain at least one capital letter.")
    .matches(/[a-z]/, "The password must contain at least one lowercase letter")
    .matches(/[0-9]/, "The password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "The password must contain at least one special character (@, $, !, %, *, ?, &)"
    )
    .required("Required!"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const userName = useId();
  const userEmail = useId();
  const userPassword = useId();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formContainer}>
        <div className={css.formWrap}>
          <label htmlFor={userName}>Username</label>

          <Field
            type="text"
            name="name"
            id={userName}
            className={css.formInput}
          />

          <ErrorMessage
            className={css.formError}
            name="name"
            component="span"
          />
        </div>

        <div className={css.formWrap}>
          <label htmlFor={userEmail}>Email</label>

          <Field
            type="email"
            name="email"
            id={userEmail}
            className={css.formInput}
          />

          <ErrorMessage
            className={css.formError}
            name="email"
            component="span"
          />
        </div>

        <div className={css.formWrap}>
          <label htmlFor={userPassword}>Password</label>

          <Field
            type="password"
            name="password"
            id={userPassword}
            className={css.formInput}
          />

          <ErrorMessage
            className={css.formError}
            name="password"
            component="span"
          />
        </div>

        <button type="submit" className={css.formBtn}>
          Create Account
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
