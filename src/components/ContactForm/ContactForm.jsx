import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../../redux/contacts/operations";
import { useId } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().max(22, "Too Long!").required("Required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Incorrect phone number format. Enter in the format 123-45-67"
    )
    .min(9, "Too Short!")
    .max(9, "Too Long!")
    .required("Required"),
});

const ContactForm = ({ initialValues, onFormSubmit }) => {
  const dispatch = useDispatch();
  const userNameId = useId();
  const userNumber = useId();

  const handleSubmit = (values, actions) => {
    if (initialValues.id) {
      dispatch(editContact(values));
      toast.success("Contact successfully updated!");
    } else {
      dispatch(addContact(values));
      toast.success("Contact successfully created!");
    }
    onFormSubmit();
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formContainer}>
        <div className={css.formWrap}>
          <label htmlFor={userNameId}>Name</label>
          <Field
            type="text"
            className={css.formInput}
            name="name"
            id={userNameId}
          />
          <ErrorMessage
            className={css.formError}
            name="name"
            component="span"
          />
        </div>

        <div className={css.formWrap}>
          <label htmlFor={userNumber}>Number</label>
          <Field
            type="tel"
            className={css.formInput}
            name="number"
            id={userNumber}
          />
          <ErrorMessage
            className={css.formError}
            name="number"
            component="span"
          />
        </div>

        <button
          type="submit"
          className={clsx(css.formBtn, {
            [css.editBtn]: initialValues.id,
            [css.addBtn]: !initialValues.id,
          })}
        >
          {initialValues.id ? "Edit" : "Add Contact"}
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
};

export default ContactForm;
