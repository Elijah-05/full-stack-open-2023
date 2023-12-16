const PersonForm = ({ newContact, handleAddPerson, handleNewPhone }) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name:{" "}
        <input value={newContact?.name} name="name" onChange={handleNewPhone} />
      </div>
      <div>
        number:{" "}
        <input
          value={newContact?.number}
          name="number"
          onChange={handleNewPhone}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
