import { useDispatch } from "react-redux";
import { IoPersonOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { deleteContact } from "../../redux/contacts/operations";
import { openModal } from "../../redux/modal/slice";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import css from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    toast(
      (t) => (
        <span className={css.tosterSpan}>
          Please confirm: Delete this contact?
          <div className={css.toaster}>
            <button
              className={clsx(css.contactBtn, css.contactBtnConfirm)}
              onClick={() => {
                dispatch(deleteContact(contact.id));
                toast.success("You are successfully deleted contact!");
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>

            <button
              className={clsx(css.contactBtn, css.contactBtnCancelBtn)}
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const handleEdit = () => {
    dispatch(openModal(contact));
  };

  return (
    <div className={css.contactContainer}>
      <ul className={css.contactWraper}>
        <li className={css.contactItem}>
          <IoPersonOutline />
          {contact.name}
        </li>
        <li className={css.contactItem}>
          <IoPhonePortraitOutline />
          {contact.number}
        </li>
      </ul>
      <div className={css.btnWrapper}>
        <button
          className={clsx(css.contactBtn, css.contactBtnEdit)}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className={clsx(css.contactBtn, css.contactBtnCancelBtn)}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};
export default Contact;
