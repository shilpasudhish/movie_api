//adding dependencies
const bodyParser = require("body-parser"),
  fs = require("fs"),
  express = require("express"),
  uuid = require("uuid"),
  morgan = require("morgan");
const app = express();
app.use(bodyParser.json());

//array of movies
let topMovies = [
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over several years, finding solace and redemption through acts of common decency.",
    genre: {
      name: "Drama",
      description:
        "A genre that focuses on emotional and relational development of characters.",
    },
    director: {
      name: "Frank Darabont",
      bio: "A renowned director known for adapting Stephen King's works into critically acclaimed films.",
      birth: "1959-01-28",
    },
    imageURL: "https://example.com/shawshank.jpg",
    isFeatured: true,
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into the mind of a CEO.",
    genre: {
      name: "Science Fiction",
      description:
        "A genre that explores futuristic concepts like advanced technology, space, and time travel.",
    },
    director: {
      name: "Christopher Nolan",
      bio: "An innovative filmmaker known for his mind-bending narratives and visual storytelling.",
      birth: "1970-07-30",
    },
    imageURL: "https://example.com/inception.jpg",
    isFeatured: true,
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: {
      name: "Crime",
      description:
        "A genre that focuses on criminal activities, organized crime, and law enforcement.",
    },
    director: {
      name: "Francis Ford Coppola",
      bio: "A legendary director and screenwriter celebrated for his work on the Godfather trilogy.",
      birth: "1939-04-07",
    },
    imageURL: "https://example.com/godfather.jpg",
    isFeatured: true,
  },
  {
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who brings chaos to Gotham.",
    genre: {
      name: "Action",
      description:
        "A genre emphasizing physical feats, intense battles, and fast-paced scenes.",
    },
    director: {
      name: "Christopher Nolan",
      bio: "An innovative filmmaker known for his mind-bending narratives and visual storytelling.",
      birth: "1970-07-30",
    },
    imageURL: "https://example.com/darkknight.jpg",
    isFeatured: false,
  },
  {
    title: "Pulp Fiction",
    description:
      "The lives of two hitmen, a boxer, and a gangster intertwine in a series of violent and unexpected incidents.",
    genre: {
      name: "Crime",
      description:
        "A genre that focuses on criminal activities, organized crime, and law enforcement.",
    },
    director: {
      name: "Quentin Tarantino",
      bio: "A bold filmmaker famous for his sharp dialogue, non-linear storytelling, and homage to pop culture.",
      birth: "1963-03-27",
    },
    imageURL: "https://example.com/pulpfiction.jpg",
    isFeatured: false,
  },
  {
    title: "Forrest Gump",
    description:
      "The life story of a simple man who witnesses and influences key historical events in America.",
    genre: {
      name: "Drama",
      description:
        "A genre that focuses on emotional and relational development of characters.",
    },
    director: {
      name: "Robert Zemeckis",
      bio: "An award-winning director known for his masterful storytelling and visual effects.",
      birth: "1952-05-14",
    },
    imageURL: "https://example.com/forrestgump.jpg",
    isFeatured: true,
  },
  {
    title: "Parasite",
    description:
      "A poor family schemes to become employed by a wealthy household, leading to unexpected consequences.",
    genre: {
      name: "Thriller",
      description:
        "A genre that builds tension and excitement, often involving twists and suspense.",
    },
    director: {
      name: "Bong Joon-ho",
      bio: "An internationally acclaimed director who masterfully blends social commentary with genre storytelling.",
      birth: "1969-09-14",
    },
    imageURL: "https://example.com/parasite.jpg",
    isFeatured: true,
  },
  {
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of his reality and his role in a war against its controllers.",
    genre: {
      name: "Science Fiction",
      description:
        "A genre that explores futuristic concepts like advanced technology, space, and time travel.",
    },
    director: {
      name: "The Wachowskis",
      bio: "Visionary siblings known for creating the groundbreaking Matrix franchise.",
      birth: "1965-06-21 (Lana), 1967-12-29 (Lilly)",
    },
    imageURL: "https://example.com/matrix.jpg",
    isFeatured: false,
  },
  {
    title: "Titanic",
    description:
      "A romance unfolds aboard the doomed R.M.S. Titanic as disaster strikes.",
    genre: {
      name: "Romance",
      description:
        "A genre focusing on love stories and emotional relationships.",
    },
    director: {
      name: "James Cameron",
      bio: "A visionary filmmaker known for directing epic blockbusters and pushing technological boundaries.",
      birth: "1954-08-16",
    },
    imageURL: "https://example.com/titanic.jpg",
    isFeatured: false,
  },
  {
    title: "Gladiator",
    description:
      "A Roman general seeks revenge after being betrayed and sold into slavery.",
    genre: {
      name: "Action",
      description:
        "A genre emphasizing physical feats, intense battles, and fast-paced scenes.",
    },
    director: {
      name: "Ridley Scott",
      bio: "A prolific director known for crafting visually stunning and emotionally engaging epics.",
      birth: "1937-11-30",
    },
    imageURL: "https://example.com/gladiator.jpg",
    isFeatured: true,
  },
];
let users = [
  {
    id: 1,
    name: "shilpa",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "goddy",
    favoriteMovies: [],
  },
];

//logging
app.use(morgan("common"));

//error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//no uri parameter defined
app.get("/", (req, res) => res.send("The page shows list of movies"));

//1. returns the list of all movies
app.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

//2. get movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find((movie) => movie.title === title);
  console.log(movie);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send(`The movie ${title} is not found`);
  }
});

//3. get movies by genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const Genre = topMovies.find((movie) => movie.genre.name === genreName).genre;
  console.log(Genre);
  if (Genre) {
    res.status(200).json(Genre);
  } else {
    res.status(400).send(`This genre is not found`);
  }
});

//4. get director's data
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = topMovies.find(
    (movie) => movie.director.name === directorName
  ).director;
  console.log(director);
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director");
  }
});

//5. post users

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
    console.log(users);
  } else {
    res.status(400).send("name are required for users");
  }
});

//6. put user by id

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//7. post favuorite movie by user
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to the user ${id}`);
  } else {
    res.status(400).send("no such user");
  }
});

//8. delete a movie
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200).send(`${movieTitle} has been removed from the user ${id}`);
  } else {
    res.status(400).send("no such user");
  }
});

//9. delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id != id);
    res.json(users).send("user has been removed");
  } else {
    res.status(400).send("no such user");
  }
});

//returns static pages
app.use("/", express.static("public"));

app.listen("8080", (req, res) => {
  console.log("server is running");
  fs.appendFile("log.txt", "URL: Timestamp: " + new Date() + "\n\n", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Added to log.");
    }
  });
});
