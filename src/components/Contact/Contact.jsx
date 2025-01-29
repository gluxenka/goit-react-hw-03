import { MdPerson, MdLocalPhone } from "react-icons/md";

import css from "./Contact.module.css";

export default function Contact({ contact: { id, name, number }, onDelete }) {
  return (
    <div className={css.ContactItem}>
      <div className={css.ContactItemDetails}>
        <div className={css.ContactItemDetailItem}>
          <MdPerson />
          <span>{name}</span>
        </div>
        <div className={css.ContactItemDetailItem}>
          <MdLocalPhone />
          <span>{number}</span>
        </div>
      </div>
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}
