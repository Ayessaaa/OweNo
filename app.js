// https://blog.logrocket.com/building-simple-login-form-node-js/
// https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
// https://dev.to/saint_vandora/how-to-implement-session-management-in-nodejs-applications-5emm

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");
const IOwe = require("./models/iOwe");

const { render } = require("ejs");
dotenv.config({ path: ".env" });

const authController = require("./controller/authController");

const app = express();

app.set("view engine", "ejs");

const dbURI = process.env.DB_URI;
if (!dbURI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/sign-up", authController.signUp);

app.get("/sign-up/:err", authController.signUpError);

app.get("/log-in", authController.logIn);

app.get("/log-in/:err", authController.logInError);

app.post("/auth/signup", authController.authSignUp);

app.post("/auth/login", authController.authLogIn);

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  console.log(req.session.username);
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("index", {
      username:
        String(req.session.username).charAt(0).toUpperCase() +
        String(req.session.username).slice(1),
    });
  } else {
    res.redirect("/log-in");
  }
});

app.get("/my-debt-details", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("myDebtDetails");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/i-owe", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("iOwe");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/they-owe", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("theyOwe");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/i-borrow", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const { from, reason, due, amount } = req.body;
    console.log(from, reason, due, amount);
    res.render("iBorrow");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/i-borrow", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const { from, reason, due, amount } = req.body;
    console.log(from, reason, due, amount);
    res.render("iBorrow");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/they-borrow", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("theyBorrow");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/my-debt-details", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("myDebtDetails");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/their-debt-details", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("theirDebtDetails");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/history", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("history");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/split-the-bill", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("splitTheBill");
  } else {
    res.redirect("/log-in");
  }
});
