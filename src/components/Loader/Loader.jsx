import BeatLoader from "react-spinners/BeatLoader";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <BeatLoader color="rgb(234, 231, 252)" />
    </div>
  );
};
export default Loader;
