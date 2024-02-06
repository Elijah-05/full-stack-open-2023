const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.static('dist'))

morgan.token(
  "req-body",
  (req) => req.method !== "GET" && JSON.stringify(req.body)
);

app.use(
  morgan(
    `:method :url :status :res[content-length] - :response-time ms :req-body`
  )
);

const phonebooks = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.get("/info", (req, res) => {
  res.send(`<h2>Phonebook has info for ${phonebooks?.length} people</h2>
    <h2>${new Date()}</h2>`);
});

app.get("/api/persons", (req, res) => {
  res.json(phonebooks);
});

app.post("/api/persons", (req, res) => {
  const name = req.body?.name;
  const number = req.body?.number;
  const randomID = Math.random().toString(36).slice(2);
  const isNameExist = phonebooks.some((phone) => phone.name == name);
  const isNumberExist = phonebooks.some((phone) => phone.number == number);
  if (name && number && !isNameExist && !isNumberExist) {
    const newPhone = {
      id: randomID,
      name,
      number,
    };
    phonebooks.push(newPhone);
    res.send(newPhone);
  } else if (isNameExist || isNumberExist) {
    res.status(404).send({
      error: `an existing phone ${
        isNameExist && isNumberExist
          ? "name and number"
          : isNameExist
          ? "name"
          : "number"
      } try another`,
    });
  } else res.status(404).end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebooks.find((phones) => phones.id == id);
  if (person) {
    res.send(person);
  } else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebooks.find((phones) => phones.id == id);
  if (person) {
    phonebooks.filter((phone) => phone.id != id);
    res.status(204).end();
  } else res.status(404).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is Listening on Port ${PORT}`);
});
