import { useState, useEffect } from "react"

import { alert, defaultModules } from "@pnotify/core"
import "@pnotify/core/dist/PNotify.css"
import * as PNotifyMobile from "@pnotify/mobile"
import "@pnotify/mobile/dist/PNotifyMobile.css"

import Form from "./components/Form/Form"
import Filter from "./components/ContactFilter/ContactFilter"
import Contacts from "./components/Contacts/ContactsList"

import "./App.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("Contacts"))
    if (localState) {
      setContacts(localState)
    } else {
      return
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("Contacts", JSON.stringify(contacts))
  }, [contacts])

  const filterleInputChange = (e) => {
    const { value } = e.currentTarget
    setFilter(value)
  }

  const handleSubmit = (data) => {
    if (contacts.find((contact) => contact.name.toLowerCase() === data.name.toLowerCase())) {
      defaultModules.set(PNotifyMobile, {})
      alert({
        text: `${data.name} is olready in contacts`,
      })
    } else {
      setContacts((prevState) => (prevState ? [...prevState, data] : [data]))
    }
  }

  const deleteContact = (id) => {
    const visiblecontact = contacts.filter((contacts) => !contacts.id.includes(id))
    setContacts(visiblecontact)
  }

  const visiblecontact = () => {
    const normalizedFilter = filter.toLowerCase()
    const visiblecontact = contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    )
    return visiblecontact
  }
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Form submit={handleSubmit} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? null : (
        <Filter filterInput={filterleInputChange} filterValue={filter} />
      )}
      {contacts.length === 0 ? (
        <p>No Contacts</p>
      ) : (
        <Contacts contacts={visiblecontact()} deleteContact={deleteContact} />
      )}
    </div>
  )
}
