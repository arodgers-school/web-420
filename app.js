/*
Title: 
    Assignment 1.2
    Assignment 4.2
    Assignment 5.2
    Assignment 6.2
    Assignment 7.2
    Assignment 8.2
Author: 
    Adam Rodgers
Date: 
    10/24/2021
    11/14/2021
    11/21/2021
    11/28/2021
    12/5/2021
    12/12/2021
Modified By: Adam Rodgers
Description: API Assignments
Resources:
    Bellevue University WEB420 Github Repo
*/

// Set requires
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");
var composerAPI = require("./routes/rodgers-composer-routes");
var personAPI = require("./routes/rodgers-person-routes");
var userAPI = require("./routes/rodgers-session-routes");
var customerAPI = require("./routes/rodgers-node-shopper-routes");

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

const conn = "mongodb+srv://web420_user:buwebdev420@buwebdev-cluster-1.zjoha.mongodb.net/web420DB?retryWrites=true&w=majority";
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

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

// Set api-docs endpoint to serve swagger view with options
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", composerAPI, personAPI, userAPI, customerAPI);

// Start webserver on Heroku-specified port, or 3000 locally
http.createServer(app).listen(port, function () {
  console.log("Application started on port " + port + "!");
});
