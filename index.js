const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
require('dotenv').config();
const jwtpassword = process.env.JWT_PASSWORD;
const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(
  mongodb_url
);

const USERS = mongoose.model("Users", {
name: String,
  username: String,
  password: String,
});

app.post("/signup", async (req, res) => {
	const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  let userExists = await USERS.findOne({ username: username });
  if (userExists) {
    return res.status(400).json({
      msg: "user aldready exists",
    });
  }
  await USERS.create({
	name: name,
    username: username,
    password: password,
  });
  res.json({
    msg: "user created successfully",
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let userExists = await USERS.findOne({ username: username });
  if (!userExists) {
    return res.status(403).json({
      msg: "user doesn't exists",
    });
  }
  const token = jwt.sign({ username: username }, jwtpassword);
  res.send(token);
});

app.get("/users", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtpassword);
    const username = decoded.username;
    const allUsers = await USERS.find({});
    res.send(allUsers.filter((value) => value.username != username));
  } catch (error) {
    console.log(error);
  }
});

app.delete("/remove-user", async function (req, res) {
	const token = req.headers.authorization;
	try {
		const decode = jwt.verify(token, jwtPassword);
		const username = decode.username;

		const deletedUser = await USERS.deleteOne({ username: username });
		if (deletedUser.deletedCount > 0) {
			res.status(200).json({ message: "User deleted Successfully..." });
		} else {
			res.status(404).json({ message: "User not found!" });
		}
	} catch (err) {
		res.status(500).json({ message: "Internal server errorr.." });
	}
});

app.listen(port, () => console.log("listening at PORT 3000"));
