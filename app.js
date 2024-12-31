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
const siteController = require("./controller/siteController");

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

app.get("/guide", siteController.guide);

app.get("/sign-up", authController.signUp);

app.get("/sign-up/:err", authController.signUpError);

app.get("/log-in", authController.logIn);

app.get("/log-in/:err", authController.logInError);

app.post("/auth/signup", authController.authSignUp);

app.post("/auth/login", authController.authLogIn);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/log-in");
    }
  });
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", siteController.home);

app.get("/my-debt-details", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/i-owe");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/their-debt-details", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/they-owe");
  } else {
    res.redirect("/log-in");
  }
});

app.get("/i-owe", siteController.iOwe);

app.get("/they-owe", siteController.theyOwe);

app.get("/i-borrow", siteController.iBorrow);
app.post("/i-borrow", siteController.iBorrowPost);

app.get("/they-borrow", siteController.theyBorrow);
app.post("/they-borrow", siteController.theyBorrowPost);

app.get("/my-debt-details/:id", siteController.myDebtDetails);
app.post("/my-debt-details/:id", siteController.myDebtDetailsPost);

app.get("/their-debt-details/:id", siteController.theirDebtDetails);
app.post("/their-debt-details/:id", siteController.theirDebtDetailsPost);

app.get("/history", siteController.history);

app.get("/split-the-bill", siteController.splitTheBill);

app.post("/split-the-bill-result", siteController.splitTheBillResult);
