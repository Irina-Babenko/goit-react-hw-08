import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/modal/slice";
import {
  selectModalOpen,
  selectEditingContact,
} from "../../redux/modal/selectors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ContactForm from "../ContactForm/ContactForm";
import css from "./BaseModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 375,
  color: "rgb(74, 51, 201)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const BaseModal = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectModalOpen);
  const editingContact = useSelector(selectEditingContact);

  const handleFormSubmit = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <button className={css.modalBtn} onClick={() => dispatch(openModal())}>
        Add Contact
      </button>
      <Modal
        open={open}
        onClose={() => dispatch(closeModal())}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={css.title}
          >
            {editingContact ? "Edit Contact" : "Add New Contact"}
          </Typography>
          <ContactForm
            onFormSubmit={handleFormSubmit}
            initialValues={editingContact || { name: "", number: "" }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default BaseModal;
