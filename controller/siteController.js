const { render } = require("ejs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const User = require("../models/user");
const IOwe = require("../models/iOwe");
const History = require("../models/history");

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
  const debtID = req.params.id;

  if (isLoggedIn) {
    IOwe.find({ _id: debtID })
      .then((resultIOwe) => {
        History.find({ debt_id: debtID })
          .sort({ createdAt: -1 })
          .then((resultHistory) => {
            console.log(resultHistory);
            res.render("myDebtDetails", {
              debtData: resultIOwe[0],
              debtHistory: resultHistory,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const myDebtDetailsPost = (req, res) => {
  const amount = req.body.amount;
  const isLoggedIn = req.session.isLoggedIn;
  const debtID = req.params.id;

  if (isLoggedIn) {
    IOwe.find({ _id: debtID })
      .exec()
      .then((result) => {
        const debtPayment = new History({
          user: req.session.username,
          debt_id: debtID,
          amount_paid: amount,
          balance: result[0].balance - amount,
          owetype: "i",
          who: result[0].who,
          reason: result[0].reason,
          due: result[0].due,
        });

        var paid = false;

        if (result[0].balance - amount <= 0) {
          var paid = true;
        }
        console.log(result[0].balance);
        console.log(paid);

        IOwe.findOneAndUpdate(
          { _id: debtID },
          {
            $inc: { balance: -amount },
            paid: paid,
          }
        )
          .exec()
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });

        User.findOneAndUpdate(
          { username: req.session.username },
          {
            $inc: { iowe: -amount },
          }
        )
          .exec()
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });

        debtPayment
          .save()
          .then((result) => {
            res.redirect("/my-debt-details/" + debtID);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
};

const theirDebtDetails = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  const debtID = req.params.id;

  if (isLoggedIn) {
    IOwe.find({ _id: debtID })
      .then((resultIOwe) => {
        History.find({ debt_id: debtID })
          .sort({ createdAt: -1 })
          .then((resultHistory) => {
            console.log(resultHistory);
            res.render("theirDebtDetails", {
              debtData: resultIOwe[0],
              debtHistory: resultHistory,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const theirDebtDetailsPost = (req, res) => {
  const amount = req.body.amount;
  const isLoggedIn = req.session.isLoggedIn;
  const debtID = req.params.id;

  if (isLoggedIn) {
    IOwe.find({ _id: debtID })
      .exec()
      .then((result) => {
        const debtPayment = new History({
          user: req.session.username,
          debt_id: debtID,
          amount_paid: amount,
          balance: result[0].balance - amount,
          owetype: "they",
          who: result[0].who,
          reason: result[0].reason,
          due: result[0].due,
        });

        var paid = false;

        if (result[0].balance - amount <= 0) {
          var paid = true;
        }
        console.log(result[0].balance);
        console.log(paid);

        IOwe.findOneAndUpdate(
          { _id: debtID },
          {
            $inc: { balance: -amount },
            paid: paid,
          }
        )
          .exec()
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });

        User.findOneAndUpdate(
          { username: req.session.username },
          {
            $inc: { theyowe: -amount },
          }
        )
          .exec()
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });

        debtPayment
          .save()
          .then((result) => {
            res.redirect("/their-debt-details/" + debtID);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
};

const history = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    History.find({ user: req.session.username })
      .sort({ createdAt: -1 })
      .then((resultHistory) => {
        IOwe.find({ user: req.session.username })

          .sort({ createdAt: -1 })
          .then((resultIOwe) => {
            res.render("history", {
              paymentData: resultHistory,
              borrowData: resultIOwe,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
  myDebtDetails,
  theirDebtDetails,
  myDebtDetailsPost,
  theirDebtDetailsPost,
  history,
};
