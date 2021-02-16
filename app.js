const express = require("express");
const helmet = require("helmet");
const routes = require("./routes");
const GithubDB = require("github-db").default;
const app = express();
var options = {
  host: "api.github.com", // <-- Private github api url. If not passed, defaults to 'api.github.com'
  pathPrefix: "", // <-- Private github api url prefix. If not passed, defaults to null.
  protocol: "https", // <-- http protocol 'https' or 'http'. If not passed, defaults to 'https'
  owner: "wefwffwfwfwf", // <-- Your Github username
  repo: "db", // <-- Your repository to be used a db
  path: "dbsync.json" // <- File with extension .json
};

var githubDB = new GithubDB(options);

githubDB.auth("324db88d077123d983f4fb6ebf1d94e63bc58b89");
githubDB.connectToRepo();
githubDB.save({ message: "wooohooeeeeeeeeeeeeeeee" });
app.use(express.json({ limit: "2000mb" }));
app.use(express.urlencoded({ extended: true, limit: "2000mb" }));
app.use(helmet());
app.use("/", routes);

// default catch all handler
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "route not defined",
    data: null
  });
});

module.exports = app;
