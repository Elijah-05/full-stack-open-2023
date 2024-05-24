import { useMutation, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import { EDIT_AUTHOR, GET_AUTHOR } from "./../queries/queries";

const Authors = (props) => {
  const result = useQuery(GET_AUTHOR);
  const [editAuthorPhone] = useMutation(EDIT_AUTHOR);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  if (!props.show || result.loading) {
    return null;
  }

  const handleAuthorUpdate = async (e) => {
    e.preventDefault();

    if (name && born) {
      await editAuthorPhone({
        variables: { name, born: +born },
        refetchQueries: [{ query: GET_AUTHOR }],
      });

      setName("");
      setBorn("");
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={handleAuthorUpdate}>
        <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input
            id="born"
            name="born"
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>Update author</button>
      </form>
    </div>
  );
};

Authors.displayName = "Authors";
Authors.propTypes = {
  show: PropTypes.bool,
};

export default Authors;
