/*
Title: 
Assignment 6.2
Author: Adam Rodgers
Date: 
  28 Nov 2021
Modified By: Adam Rodgers
Description: NodeSecurity
Resources:
  Bellevue University Github Repo
*/

// Set requires
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Build schema
let userSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  emailAddress: { type: Array },
});

// Export module
module.exports = mongoose.model("User", userSchema);
