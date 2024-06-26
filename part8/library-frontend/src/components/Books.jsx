import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import { FIND_BOOKS, GET_ALL_BOOKS } from "./../queries/queries";

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState(null);
  const { loading, data, error, refetch } = useQuery(
    filterGenre ? FIND_BOOKS : GET_ALL_BOOKS,
    {
      variables: { title: "", genre: filterGenre },
    }
  );

  if (props.show && loading) {
    return <p>Loading All Books...</p>;
  }

  if (!props.show || loading || error) {
    return null;
  }

  function handleGenreFilter(filter) {
    setFilterGenre(filter);
    refetch();
  }

  return (
    <div>
      <h2>books</h2>

      {filterGenre && (
        <p>
          in genre <strong>{filterGenre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a?.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handleGenreFilter("refactoring")}>
          refactoring
        </button>
        <button onClick={() => handleGenreFilter("agile")}>agile</button>
        <button onClick={() => handleGenreFilter("patterns")}>patterns</button>
        <button onClick={() => handleGenreFilter("design")}>design</button>
        <button onClick={() => handleGenreFilter("crime")}>crime</button>
        <button onClick={() => handleGenreFilter("classic")}>classic</button>
        <button onClick={() => handleGenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

Books.displayName = "Books";
Books.propTypes = {
  show: PropTypes.bool,
};

export default Books;
