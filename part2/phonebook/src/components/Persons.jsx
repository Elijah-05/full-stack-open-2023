const Persons = ({ filteredContact }) => {
  return filteredContact.map((person, i) => <p key={i}>{person.name}</p>);
};

export default Persons;
