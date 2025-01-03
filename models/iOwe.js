const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const iOweSchema = new Schema(
  {
    user: { type: String, require: true },
    who: { type: String, require: true },
    reason: { type: String, require: true },
    due: { type: Date, require: true },
    amount: { type: Number, require: true },
    balance: { type: Number, require: true },
    paid: { type: Boolean, require: true },
    owetype: { type: String, require: true },
  },
  { timestamps: true }
);

const IOwe = mongoose.model("IOwe", iOweSchema);
module.exports = IOwe;
