const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
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
  actors: [String],
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  duration: { type: Number },
  rating: { type: Number, min: 0, max: 10 },
});

let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthday: Date,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
