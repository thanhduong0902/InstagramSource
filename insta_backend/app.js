const express = require("express");
const jwt = require("jsonwebtoken");
const authCtrl = require("./controller/Authcontrol");
const app = express();
const { connectDb } = require("./db");
app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.listen(3000, () => {
  console.log("running at 3000");
  connectDb();
});
