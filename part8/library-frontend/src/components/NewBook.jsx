import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import { ADD_BOOK, GET_ALL_BOOKS } from "../queries/queries";
import { updateCache } from "../helpers/helpers";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const errors = error?.graphQLErrors[0]?.extensions?.error?.errors;
      const messages =
        errors &&
        Object.values(errors)
          .map((e) => e.message)
          .join("\n");
      console.log("OnError", messages);
    },
    update: (cache, response) => {
      updateCache(cache, { query: GET_ALL_BOOKS }, response.data.addBook);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published, genres },
    });

    // setTitle("");
    // setPublished("");
    // setAuthor("");
    // setGenres([]);
    // setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(+target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.displayName = "NewBook";
NewBook.propTypes = {
  show: PropTypes.bool,
};

export default NewBook;
