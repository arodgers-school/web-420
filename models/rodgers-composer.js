var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let composerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

module.exports = mongoose.model("Composer", composerSchema);
