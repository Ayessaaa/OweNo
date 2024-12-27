const { render } = require("ejs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const User = require("../models/user");
const IOwe = require("../models/iOwe");

const home = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    User.find({ username: req.session.username })
      .exec()
      .then((result) => {
        IOwe.find({ user: req.session.username })
          .sort({ due: 1 })
          .exec()
          .then((oweResult) => {
            console.log(oweResult);
            res.render("index", {
              username:
                String(req.session.username).charAt(0).toUpperCase() +
                String(req.session.username).slice(1),
              userData: result[0],
              owesData: oweResult,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const iBorrow = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const { from, reason, due, amount } = req.body;
    console.log(from, reason, due, amount);
    res.render("iBorrow");
  } else {
    res.redirect("/log-in");
  }
};

const iBorrowPost = (req, res) => {
  const { from, reason, due, amount } = req.body;
  const debt = new IOwe({
    user: req.session.username,
    who: from,
    reason: reason,
    due: due,
    amount: amount,
    balance: amount,
    paid: false,
    owetype: "i",
  });

  User.findOneAndUpdate(
    { username: req.session.username },
    {
      $inc: { iowe: +amount }, // Decrement stock by 1
    }
  )
    .exec()
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });

  debt
    .save()
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const theyBorrow = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("theyBorrow");
  } else {
    res.redirect("/log-in");
  }
};

const theyBorrowPost = (req, res) => {
  const { borrower, reason, due, amount } = req.body;
  const debt = new IOwe({
    user: req.session.username,
    who: borrower,
    reason: reason,
    due: due,
    amount: amount,
    balance: amount,
    paid: false,
    owetype: "they",
  });

  User.findOneAndUpdate(
    { username: req.session.username },
    {
      $inc: { theyowe: +amount }, // Decrement stock by 1
    }
  )
    .exec()
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });

  debt
    .save()
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const iOwe = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    User.find({ username: req.session.username })
      .exec()
      .then((result) => {
        IOwe.find({ user: req.session.username, owetype: "i" })
          .sort({ due: 1 })
          .exec()
          .then((oweResult) => {
            console.log(oweResult);
            res.render("iOwe", {
              username:
                String(req.session.username).charAt(0).toUpperCase() +
                String(req.session.username).slice(1),
              userData: result[0],
              owesData: oweResult,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const theyOwe = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    User.find({ username: req.session.username })
      .exec()
      .then((result) => {
        IOwe.find({ user: req.session.username, owetype: "they" })
          .sort({ due: 1 })
          .exec()
          .then((oweResult) => {
            console.log(oweResult);
            res.render("theyOwe", {
              username:
                String(req.session.username).charAt(0).toUpperCase() +
                String(req.session.username).slice(1),
              userData: result[0],
              owesData: oweResult,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const myDebtDetails = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  const debtID = req.params.id
  console.log(debtID)

  if (isLoggedIn) {
    IOwe.find({_id: debtID})
    .exec()
    .then((result)=>{
      console.log(result)
    res.render("myDebtDetails", {debtData: result[0]});

    })
  } else {
    res.redirect("/log-in");
  }
};

module.exports = {
  home,
  iBorrow,
  iBorrowPost,
  theyBorrow,
  theyBorrowPost,
  iOwe,
  theyOwe,
  myDebtDetails
};
