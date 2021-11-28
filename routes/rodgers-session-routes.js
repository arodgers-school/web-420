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
  https://swagger.io/docs/specification/data-models/data-types/
*/

// Set requires
var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");

var User = require("../models/rodgers-user");

let saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: Signup
 *     summary: Register a new user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        // If user doesn't already exist, proceed.  Otherwise, send 401 error
        if (!user) {
          // Hash password with bcrypt
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

          console.log(hashedPassword);

          const newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress,
          };
          // Create new user with entered username, email, and hashed password
          User.create(newRegisteredUser, function (err, registeredUser) {
            if (err) {
              res.status(501).send({
                message: "MongoDB Exception",
              });
            } else {
              res.json(registeredUser);
            }
          });
        } else {
          res.status(401).send({
            message: "Username is already in use.",
          });
        }
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        if (user) {
          // Compare encrypted stored password with entered PW
          console.log(user.password);
          console.log(req.body.password);
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

          // If password matches, log them in
          if (passwordIsValid) {
            res.status(200).send({
              message: "User logged in",
            });
          }

          // If password/username doesn't match, send Error 401
          else {
            res.status(401).send({
              message: "Invalid username and/or password",
            });
          }
        } else {
          res.status(401).send({
            message: `Invalid username and/or password`,
          });
        }
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Server Exception",
    });
  }
});

module.exports = router;
