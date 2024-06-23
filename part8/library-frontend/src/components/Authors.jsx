import { useMutation, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import { EDIT_AUTHOR, GET_AUTHOR } from "./../queries/queries";
import Select from "react-select";

const Authors = ({ show, token }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(GET_AUTHOR);
  const [editAuthorPhone] = useMutation(EDIT_AUTHOR, {
    skip: born,
  });

  if (show && result.loading) {
    return <p>Loading Authors...</p>;
  }

  if (!show) {
    return null;
  }

  const authorList = result?.data?.allAuthors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  const handleAuthorUpdate = async (e) => {
    e.preventDefault();

    if (name && born) {
      await editAuthorPhone({
        variables: { name, born: +born },
        refetchQueries: [{ query: GET_AUTHOR }],
      });

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
      {token && (
        <>
          <h2>Set Birth Year</h2>
          <form onSubmit={handleAuthorUpdate}>
            <div>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={""}
                //  isRtl={isRtl}
                name="color"
                options={authorList}
                onChange={(val) => setName(val.value)}
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
        </>
      )}
    </div>
  );
};

Authors.displayName = "Authors";
Authors.propTypes = {
  show: PropTypes.bool,
  token: PropTypes.string,
};

export default Authors;
