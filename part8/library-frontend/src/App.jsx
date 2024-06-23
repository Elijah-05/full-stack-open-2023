import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Caution from "./components/Caution";
import { BOOK_ADDED, GET_ALL_BOOKS } from "./queries/queries";
import { updateCache } from "./helpers/helpers";

const App = () => {
  const [token, setToken] = useState(null);
  const [caption, setCaption] = useState({
    message: "",
    error: false,
  });
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      handleCreateCaption({
        message: `New Book titled "${addedBook.title}" is Added!`,
        error: false,
      });
      updateCache(client.cache, { query: GET_ALL_BOOKS }, addedBook);
    },
  });
  const storedToken = localStorage.getItem("user-token");
  let timeout;

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, [storedToken]);

  function handleLogout() {
    setToken(null);
    setPage("authors");
    localStorage.clear();
    client.resetStore();
  }

  function handleCreateCaption(captionObj) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setCaption({ message: "" });
    }, 1000 * 5);
    setCaption(captionObj);
  }

  return (
    <div>
      <div>
        <button
          style={{
            backgroundColor: page === "authors" ? "lightBlue" : "white",
            border: "1px solid gray",
            padding: "6px 12px",
            borderRadius: "4px",
          }}
          onClick={() => setPage("authors")}
        >
          authors
        </button>
        <button
          style={{
            backgroundColor: page === "books" ? "lightBlue" : "white",
            border: "1px solid gray",
            padding: "6px 12px",
            borderRadius: "4px",
          }}
          onClick={() => setPage("books")}
        >
          books
        </button>
        {token && (
          <button
            style={{
              backgroundColor: page === "add" ? "lightBlue" : "white",
              border: "1px solid gray",
              padding: "6px 12px",
              borderRadius: "4px",
            }}
            onClick={() => setPage("add")}
          >
            add book
          </button>
        )}
        <button
          style={{
            backgroundColor: page === "login" ? "lightBlue" : "white",
            border: "1px solid gray",
            padding: "6px 12px",
            borderRadius: "4px",
          }}
          onClick={() => (token ? handleLogout() : setPage("login"))}
        >
          {token ? "Logout" : "Login"}
        </button>
      </div>

      <Caution caption={caption} />

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login
        show={page === "login"}
        setToken={setToken}
        setCaption={handleCreateCaption}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
