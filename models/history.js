const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    user: { type: String, require: true },
    debt_id: { type: String, require: true },
    amount_paid: { type: Number, require: true },
    balance: { type: Number, require: true },
    owetype: { type: String, require: true },
    who: { type: String, require: true },
    reason: { type: String, require: true },
    due: { type: Date, require: true },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);
module.exports = History;
