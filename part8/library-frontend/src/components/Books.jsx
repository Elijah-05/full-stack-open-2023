import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./../queries/queries";
import PropTypes from "prop-types";

const Books = (props) => {
  const { loading, data, error } = useQuery(GET_BOOKS);

  if (!props.show || loading || error) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Books.displayName = "Books";
Books.propTypes = {
  show: PropTypes.bool,
};

export default Books;
