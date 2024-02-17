const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  url: String,
  virusTotal: String,
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Searches", SearchSchema);


