/*
Title: 
    Assignment 1.2
Author: 
    Adam Rodgers
Date: 
    10/24/2021
Modified By: Adam Rodgers
Description: GitHub and Project Setup
Resources:

*/

// Set requires
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");

// Initialize express
var app = express();

// Set port for Heroku or local
var port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Set options for swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

// Use swagger options with openapiSpecification
openapiSpecification = swaggerJsdoc(options);

// Set api-docs endport to serve swagger view with options
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Start webserver on Heroku-specified port, or 3000 locally
http.createServer(app).listen(port, function () {
  console.log("Application started on port " + port + "!");
});
