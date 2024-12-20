//adding dependencies
const bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Models = require("./model"),
  Movies = Models.Movie,
  Users = Models.User,
  fs = require("fs"),
  express = require("express"),
  uuid = require("uuid"),
  morgan = require("morgan");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/MyFlixDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//2. get movie by title
app.get("/movies/:title", async (req, res) => {
  await Movies.findOne({ title: req.params.title })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//3. get movies by genre

app.get("/movies/genre/:genreName", async (req, res) => {
  await Movies.find({ "genre.name": req.params.genreName })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//4. get director's data

app.get("/movies/director/:directorName", async (req, res) => {
  await Movies.find({ "director.name": req.params.directorName })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//5. post users

app.post("/users", async (req, res) => {
  await Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + "already exists");
      } else {
        Users.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//6 updates users by username
app.put("/users/:Username", async (req, res) => {
  await Users.findOneAndUpdate(
    { username: req.params.Username }, // Case-insensitive search
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday,
      },
    },
    { new: true } // Return the updated user
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send("No such user found."); // Handle user not found
      }
      res.status(200).json(updatedUser); // Return updated user
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error); // Handle server errors
    });
});

//7. post favuorite movie by user

app.post("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { username: req.params.Username },
    {
      $addToSet: { favorites: req.params.MovieID },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//8. delete a movie from favorites of a user

app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { username: req.params.Username },
    {
      $pull: { favorites: req.params.MovieID },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//9. delete user

app.delete("/users/:Username", async (req, res) => {
  await Users.findOneAndDelete({ username: req.params.Username })
    .then((user) => {
      if (!user) {
        return res.status(400).send(req.params.Username + "not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});
//for testing purpose
//10.get users

app.get("/users", async (req, res) => {
  await Users.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//11 get users by username
app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ username: req.params.Username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
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
