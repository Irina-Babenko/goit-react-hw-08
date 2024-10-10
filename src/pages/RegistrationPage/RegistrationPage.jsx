import DocumentTitle from "../../components/DocumentTitle";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Registration</DocumentTitle>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
