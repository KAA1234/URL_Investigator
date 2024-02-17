const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VirusTotalSchema = new Schema({
  domain: { type: Schema.Types.ObjectId, ref: "Domains", required: true }, // reference to the associated book
  score: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

//Need to fix this once I understand it better
// Virtual for author's URL
//DomainsSchema.virtual("url").get(function () {
//  We don't use an arrow function as we'll need the this object
//  return `/catalog/author/${this._id}`;
//});

// Export model
module.exports = mongoose.model("VirusTotal", VirusTotalSchema);
