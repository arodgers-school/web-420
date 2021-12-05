/*
Title: 
Assignment 7.2
Author: Adam Rodgers
Date: 
  5 Dec 2021
Modified By: Adam Rodgers
Description: NodeShopper API
Resources:
  Bellevue University Github Repo
*/

// Set requires
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Build line item schema
let lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// Build invoice schema
let invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: [lineItemSchema],
});

// Build customer schema
let customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  invoices: [invoiceSchema],
});

// Export module
module.exports = mongoose.model("Customer", customerSchema);
