import Contact from "./Contact";
import shortid from "shortid";
import s from "./ContactsList.module.css";

export default function Contacts({ contacts, deleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map((contact) => {
        let contactid = shortid.generate();
        return (
          <Contact
            key={contactid}
            contact={contact}
            deleteContact={deleteContact}
          />
        );
      })}
    </ul>
  );
}
