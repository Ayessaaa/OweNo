const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myDebtSchema = new Schema(
  {
    user: { type: String, require: true },
    my_debt: { type: Number, require: true },
    date: { type: String, require: true },
  },
  { timestamps: true }
);

const MyDebt = mongoose.model("MyDebt", myDebtSchema);
module.exports = MyDebt;
