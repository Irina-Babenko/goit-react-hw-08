import { useDispatch } from "react-redux";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const FeedbackSchema = Yup.object().shape({
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const userEmail = useId();
  const userPassword = useId();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formContainer}>
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
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
