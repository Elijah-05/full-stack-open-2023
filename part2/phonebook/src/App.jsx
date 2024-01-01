import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import phoneService from "./services/phoneService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  //initial fetch contacts data
  useEffect(() => {
    phoneService.getContacts().then((res) => setPersons(res));
  }, []);

  //filter for showing all contact or searched result
  const filteredContact = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  //handle onChange search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //handle onChange name and phone input
  const handleNameAndPhoneInput = (event) => {
    const eventValue = event.target.value;
    setNewContact({ ...newContact, [event.target.name]: eventValue });
  };

  const resetInputField = () => {
    setNewContact({ name: "", number: "" });
  };

  //create a phone contact and store to server
  const handleAddPerson = (e) => {
    e.preventDefault();
    if (newContact.name.trim() !== "") {
      const newContactObj = {
        name: newContact.name.trim(),
        number: newContact.number.trim(),
      };
      const isTherePrevContact = persons.some(
        (person) => person.name.trim() === newContactObj.name
      );

      if (isTherePrevContact) {
        const contactID = persons.find(
          (person) => person.name.trim() === newContactObj.name
        ).id;
        const message = `${newContactObj.name} is already added to phonebook, replace the old number with a new one?`;
        confirm(message) &&
          phoneService.updateContact(contactID, newContactObj).then((res) => {
            setPersons(
              persons.map((person) => (person.id !== res.id ? person : res))
            );
            resetInputField();
          });
      } else if (!isTherePrevContact) {
        phoneService
          .createContact(newContactObj)
          .then((res) => setPersons(persons.concat(res)));
        resetInputField();
      }
    }
  };

  //delete contact
  const handleDeleteContact = (id) => {
    const message = `Delete ${persons.find(person => person.id === id).name}?`;
    confirm(message) &&
      phoneService
        .deleteContact(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        newContact={newContact}
        handleAddPerson={handleAddPerson}
        handleInputs={handleNameAndPhoneInput}
      />
      <h3>Numbers</h3>
      <Persons
        filteredContact={filteredContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
