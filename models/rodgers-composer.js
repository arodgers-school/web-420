/*
Title: 
Assignment 4.2
Author: Adam Rodgers
Date: 
  14 Nov 2021
Modified By: Adam Rodgers
Description: Composer API
Resources:
  Bellevue University Github Repo
*/

// Set requires
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Build composer schema
let composerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// Export module
module.exports = mongoose.model("Composer", composerSchema);
