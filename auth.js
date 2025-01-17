const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport");

// Function to generate a JWT token
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // Username being encoded in the JWT
    expiresIn: "7d", // Token expiration time
    algorithm: "HS256", // Algorithm used for signing
  });
};

// Export a function that takes a router and adds the login endpoint
module.exports = (router) => {
  router.post("/login", (req, res) => {
    console.log("Request body:", req.body);
    // Decode the URL parameters explicitly
    const { username, password } = req.query;
    const decodedUsername = decodeURIComponent(username); // Decode username if it's URL-encoded
    const decodedPassword = decodeURIComponent(password); // Decode password if it's URL-encoded

    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }

      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }

        // Generate the token and send it in the response
        const token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
