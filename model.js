const mongoose = require("mongoose");
let movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  Description: { type: String, required: true },
  releaseYear: { type: Number },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
    birthYear: Number,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
  duration: { type: Number },
  rating: { type: Number },
});

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
