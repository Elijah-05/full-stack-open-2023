const PersonForm = ({ newContact, handleAddPerson, handleInputs }) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name:{" "}
        <input value={newContact?.name} name="name" onChange={handleInputs} />
      </div>
      <div>
        number:{" "}
        <input
          value={newContact?.number}
          name="number"
          onChange={handleInputs}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
