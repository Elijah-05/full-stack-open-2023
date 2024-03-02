const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const loginRoute = require("express").Router();

loginRoute.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isPasswordMatched = user
    ? await bcrypt.compare(password, user?.passwordHash)
    : false;

  if (!(user && isPasswordMatched)) {
    return res.status(401).send({
      error: "invalid username or password",
    });
  }

  const tokenData = {
    username: user.username,
    id: user.id,
  };

  const expiry = { expiresIn: 60 * 30 };

  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, expiry);
  res.send({ username: user.username, name: user.name, token });
});

module.exports = loginRoute;
