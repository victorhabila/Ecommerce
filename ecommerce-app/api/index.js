const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");

const User = require("./models/user");
const Order = require("./models/order");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
mongoose
  .connect(
    "mongodb+srv://victorhabila:[your pass].com@cluster0.ck26w.mongodb.net/",
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

const sendVerificationEmail = async (email, verificationToken) => {
  // create nodemailer transport
  const transporter = nodeMailer.createTransport({
    //configure email service
    service: "gmail",
    auth: {
      user: "viqroy@gmail.com",
      pass: "jgjhmgkqkwrwfiio",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://192.168.1.12:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
//endpoint to register into our app

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking if user already register with this email

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    //create a new user
    const newUser = new User({ name, email, password });

    //generate and store verification token

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save user to database
    await newUser.save();

    // send email verification token to user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (err) {
    console.log("Error registering user", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //find user with the verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // mark user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "User email verifcation successful" });
  } catch (err) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();
//end point for login

app.post("/login", async (req, res) => {
  try {
    //access to email and password from our req
    const { email, password } = req.body;
    const user = await User.findOne(email);

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //generate login token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
