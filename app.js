const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { render } = require("ejs");
dotenv.config({ path: ".env" });

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.get("/log-in", (req, res) => {
  res.render("log-in");
});

app.get("/my-debt-details", (req, res) => {
  res.render("myDebtDetails");
});


app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/i-owe", (req, res) => {
  res.render("iOwe");
});

app.get("/they-owe", (req, res) => {
  res.render("theyOwe");
});

app.get("/i-borrow", (req, res) => {
  res.render("iBorrow");
});

app.get("/they-borrow", (req, res) => {
  res.render("theyBorrow");
});

app.get("/my-debt-details", (req, res) => {
  res.render("myDebtDetails");
});

app.get("/their-debt-details", (req, res) => {
  res.render("theirDebtDetails");
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.get("/split-the-bill", (req, res) => {
  res.render("splitTheBill");
});






