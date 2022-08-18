const express = require("express");
const jwt = require("jsonwebtoken");
const authCtrl = require("../controller/Authcontrol");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();
router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});
router.get("/signin", (req, res) => {
  res.send("auth");
});
router.post("/signin", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userWithToken = await authCtrl.signIn(username, email, password);
    res.json(userWithToken);
  } catch (error) {
    next();
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  await authCtrl.signUp(username, email, password);
  res.json({
    message: "SIgn up success",
  });
});

router.get("/me", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "PRIVATE_KEY", (err, decoded) => {
    if (!err) {
      res.json({ username: decoded.username });
    } else res.status(401).send("Invalid token");
  });
});
module.exports = router;
