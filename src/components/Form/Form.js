import { useState } from "react"
import shortid from "shortid"
import s from "./Form.module.css"

export default function Form({ submit }) {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  const formsubmit = (e) => {
    const id = shortid.generate()
    e.preventDefault()
    reset()
    submit({ name: name, number: number, id: id })
  }

  const reset = () => {
    setName("")
    setNumber("")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget

    switch (name) {
      case "name":
        setName(value)
        break
      case "number":
        setNumber(value)
        break
      default:
        return
    }
  }
  return (
    <form onSubmit={formsubmit} className={s.form}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          className={s.input}
          value={name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          className={s.input}
          value={number}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button type="submit" className={s.button}>
        Add Contact
      </button>
    </form>
  )
}
