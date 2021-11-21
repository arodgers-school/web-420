/*
Title: 
Assignment 5.2
Author: Adam Rodgers
Date: 
  21 Nov 2021
Modified By: Adam Rodgers
Description: Person's API
Resources:
  Bellevue University Github Repo
*/

// Set requires
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Build schemas
let roleSchema = new Schema({
  test: { type: String },
});

let dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

let personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

// Export module
module.exports = mongoose.model("Person", personSchema);
