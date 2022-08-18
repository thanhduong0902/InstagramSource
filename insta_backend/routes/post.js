const express = require("express");
const { db } = require("../db");
const requireLogin = require("../middleware/requireLogin");
const postCtrl = require("../controller/Post");

const router = express.Router();

router.get("/allpost", (req, res) => {
  db.post
    .find()
    .toArray()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/mypost", requireLogin, (req, res) => {
  db.post
    .find({ username: req.user.username })
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/:id", (req, res) => {});

router.post("/createpost", requireLogin, async (req, res) => {
  const username = req.user.username;
  const { likes, isLiked, caption, postImage } = req.body;
  if (!username) {
    return res.status(422).json({ error: "please full" });
  }
  const newPost = await postCtrl.newPost(
    username,
    likes,
    isLiked,
    caption,
    postImage
  );
  const updatePost = await postCtrl.findPost(username);
  res.json(updatePost);
});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;
