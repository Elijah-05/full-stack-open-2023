const { MONGO_URI } = require("./utils/config");
const express = require("express");
const { info, error } = require("./utils/logger");
const cors = require("cors");
const blogRouter = require("./controllers/blogRoutes");
const mongoose = require("mongoose");
const {
  morganRequstLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middlewares");

const app = express();

info("connecting...", MONGO_URI);

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => info("Connected to mongoDB!"))
  .catch(() => error("Fild to connect to Database"));

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morganRequstLogger());

app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
