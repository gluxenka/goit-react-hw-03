import css from "./App.module.css";

import initialContact from "../../assets/initialContacts.json";

import ContactForm from "../ContactForm/ContactForm.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
import ContactList from "../ContactList/ContactList.jsx";
import { useEffect, useState } from "react";

const CONTACT_STORAGE_KEY = "contacts";

function App() {
  const [contacts, setContacts] = useState(() => {
    const rawData = window.localStorage.getItem(CONTACT_STORAGE_KEY);

    try {
      const parsedData = JSON.parse(rawData);

      if (!parsedData) {
        throw new Error("Store is empty");
      }

      if (!Array.isArray(parsedData)) {
        throw new Error("invalid storage data structure");
      }

      return parsedData;
    } catch {
      return initialContact;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };
  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id),
    );
  };

  return (
    <>
      <div className={css.taskContainer}>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <SearchBox value={searchTerm} onFilter={setSearchTerm} />
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
    </>
  );
}

export default App;
