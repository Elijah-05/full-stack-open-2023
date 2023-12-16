import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [search, setSearch] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  const filteredContact = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  const handleNewPhone = (event) => {
    console.log(
      "event TargetName: ",
      event.target.name,
      "targetValue: ",
      event.target.value
    );
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    const newContactInput = {
      name: newContact.name,
      number: newContact.number,
      id: persons.length + 1,
    };
    const isTherePreviousName = persons.some(
      (person) =>
        person.name === newContactInput.name &&
        person.number === newContactInput.number
    );

    if (isTherePreviousName) {
      alert(`${newContact.name} is already added to phonebook`);
    } else if (!isTherePreviousName && newContact.name.trim() !== "") {
      setPersons([...persons, newContactInput]);
      setNewContact({ name: "", number: "" });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log({ persons });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        newContact={newContact}
        handleAddPerson={handleAddPerson}
        handleNewPhone={handleNewPhone}
      />
      <h3>Numbers</h3>
      <Persons filteredContact={filteredContact} />
    </div>
  );
};

export default App;
