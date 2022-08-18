const { db } = require("../db");
const findPost = async (username) => {
  return await db.post.findOne({ username: username });
};
const insertPost = async (username, likes, isLiked, caption, postImage) => {
  return await db.post.insertOne({
    username: username,
    likes: likes,
    isLiked: isLiked,
    caption: caption,
    postImage: postImage,
  });
};
module.exports = { insertPost, findPost };
