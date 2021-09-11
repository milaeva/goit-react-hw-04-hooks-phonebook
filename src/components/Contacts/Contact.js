import s from "./ContactsList.module.css"

export default function Contact({ contact, deleteContact }) {
  return (
    <li className={s.item}>
      <p>
        {contact.name}: {contact.number}
      </p>
      <button
        type="button"
        className={s.button}
        id={contact.id}
        onClick={() => deleteContact(contact.id)}
      >
        Delete
      </button>
    </li>
  )
}
