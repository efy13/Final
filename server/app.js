const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const ConnectDb = require("./db/ConnectDb");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
ConnectDb();
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
  });
});

app.listen(PORT, () => {
  console.log("server is running");
});
