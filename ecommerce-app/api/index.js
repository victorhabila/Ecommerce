const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
mongoose
  .connect(
    "mongodb+srv://victorhabila:[your password]@cluster0.ck26w.mongodb.net/",
    {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

app.listen(port, () => {
  console.log("server running on port 8000");
});

//endpoint to register into our app
