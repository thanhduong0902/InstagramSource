const postModels = require("../models/post");

const newPost = async (username, likes, isLiked, caption, postImage) => {
  return await postModels.insertPost(
    username,
    likes,
    isLiked,
    caption,
    postImage
  );
};

const findPost = async (username, likes, isLiked, caption, postImage) => {
  return await postModels.findPost(username);
};

module.exports = { newPost, findPost };
