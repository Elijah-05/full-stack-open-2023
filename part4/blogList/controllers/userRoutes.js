const bcrypt = require("bcrypt");
const userRoutes = require("express").Router();
const User = require("../models/usersModel");

userRoutes.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;

  try {
    if (username.length >= 3 && name && password.length > 3) {
      const userData = new User({
        username,
        name,
        passwordHash: await bcrypt.hash(password, saltRounds),
      });

      const response = await userData.save();
      const modifiedResponse = {
        username: response.username,
        name: response.name,
        notes: response.notes,
        id: response.id,
        password,
      };
      res.status(201).send(modifiedResponse);
    } else res.status(400).send({ error: "check credential lengths" });
  } catch (err) {
    next(err);
  }
});

userRoutes.get("/", async (req, res, next) => {
  const response = await User.find({}).populate("blogs", { user: 0 });
  res.send(response);
});

module.exports = userRoutes;
