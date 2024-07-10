import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";
import Caution from "./components/Caution";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  const storedToken = localStorage.getItem("user-token");

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

      <Caution errorMessage={errorMessage} />

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login
        show={page === "login"}
        setToken={setToken}
        setError={setErrorMessage}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
