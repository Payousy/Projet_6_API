const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, riquired: true },
  name: { type: String, riquired: true },
  description: { type: String, riquired: true },
  mainPepper: { type: String, riquired: true },
  imageUrl: { type: String, riquired: true },
  heat: { type: Number, riquired: true },
  likes: { type: Number, riquired: true },
  dislikes: { type: Number, riquired: true },
  usersLiked: { type: [String], riquired: true },
  usersDisliked: { type: [String], riquired: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);
