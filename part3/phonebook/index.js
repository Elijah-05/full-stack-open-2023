require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Phones = require("./models/Phonebook");
const app = express();
// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
// app.use(requestLogger)

morgan.token(
  "req-body",
  (req) => req.method !== "GET" && JSON.stringify(req.body)
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

const errorHandler = (err, req, res, next) => {
  console.log("Error handler message: ", err.message);

  if (err.name === "CastError")
    res.status(404).send({ error: "malformatted id" });
  else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

const unknownEndPoint = (req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

app.get("/info", async (req, res) => {
  res.send(`<h2>Phonebook has info for ${
    (await Phones.find()).length
  } people</h2>
    <h2>${new Date()}</h2>`);
});

app.get("/api/persons", (req, res) => {
  Phones.find().then((response) => res.send(response));
});

app.post("/api/persons", (req, res, next) => {
  const name = req.body?.name;
  const number = req.body?.number;
  const randomID = Math.random().toString(36).slice(2);
  const newPhone = new Phones({
    id: randomID,
    name,
    number,
  });

  newPhone
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Phones.findById(id)
    .then((response) => {
      response ? res.send(response) : res.status(404).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Phones.findByIdAndDelete(id)
    .then((response) => {
      if (response) res.status(204).end();
      console.log("delted but not there");
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const updatingPhone = {
    name: req.body?.name,
    number: req.body?.number,
  };
  Phones.findByIdAndUpdate(id, updatingPhone, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((response) => {
      console.log("response after an Update: ", response);
      res.send(response);
    })
    .catch((err) => next(err));
});

app.use(unknownEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is Listening on Port ${PORT}`);
});
