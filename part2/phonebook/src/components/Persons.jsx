const Persons = ({ filteredContact, onDelete }) => {
  return filteredContact.map((person, i) => (
    <div
      style={{ display: "flex", height: 35, alignItems: "center", gap: "10px" }}
      key={i}
    >
      <p  style={{fontWeight: '600'}}>{person.name}</p>
      <p style={{}}>{person.number}</p>
      <button onClick={() => onDelete(person.id)}>delete</button>
    </div>
  ));
};

export default Persons;
