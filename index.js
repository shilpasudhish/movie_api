const express = require("express"),
  morgan = require("morgan");
const app = express();
let topMovies = [
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
  },
  {
    title: "Fight Club",
    director: "David Fincher",
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    director: "Peter Jackson",
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
  },
];
app.use(morgan("common"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => res.send("The page shows list of movies"));

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use("/", express.static("public"));

app.listen("8080", (req, res) => {
  console.log("server is running");
});
