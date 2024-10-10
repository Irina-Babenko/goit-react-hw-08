import DocumentTitle from "../../components/DocumentTitle";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home</DocumentTitle>

      <div>
        <h1 className={css.title}>
          {" "}
          <span>Welcome</span> to your contactbook!
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
