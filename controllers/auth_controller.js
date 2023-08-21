const mongoose = require("mongoose");
const UserSchema = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const validator = require("validator");

// Generating token for authenticated user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// create new account
const createAccountCont = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ msg: "please fill in all fields" });
  } else if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "please enter a valid email" });
  } else if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ msg: "please enter a strong password" });
  } else {
    try {
      const check_users = await UserSchema.findOne({ email });
      if (check_users) {
        return res.status(400).json({ msg: "email already used!" });
      } else {
        const user_details = new UserSchema({
          firstName,
          lastName,
          email,
          password,
          phone,
        });
        const salt = await bcrypt.genSalt(10);
        user_details.password = await bcrypt.hash(password, salt);
        await user_details.save();
        const user_token = generateToken(user_details._id);
        const user = { ...user_details.toObject() };
        delete user.password;
        //
        // Code for sending mail
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.REAL_ESTATE_APP_NAME,
            pass: process.env.REAL_ESTATE_APP_PASSWORD,
          },
        });

        //   https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted

        const mailOptions = {
          from: "noreply@gmail.com",
          // to: user_details.email,
          to: "okorojameschizaram@gmail.com",
          subject: "Real Estate App Account Creation",
          html: `Thank you for registering with Technobs Digital Solutions via the class monitor app.<br />
            Your student id is <span style:'font-weight:bold'>James....</span>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error + "Error here");
          } else {
            console.log("Email sent: " + info.response);
            console.log(info);
          }
        });

        //
        //
        return res.status(201).json({ user, user_token });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  }
};

// login user
const loginUserCont = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "please fill in all fields!" });
  } else if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "not a valid email address!" });
  } else {
    const check_users = await UserSchema.findOne({ email });
    if (!check_users) {
      return res.status(400).json({ msg: "incorrect credentials!" });
    } else if (
      check_users &&
      (await bcrypt.compare(password, check_users.password))
    ) {
      const user_token = generateToken(check_users._id);
      const user = { ...check_users.toObject() };
      delete user.password;
      return res.status(200).json({ user, user_token });
    } else {
      return res.status(500).json({ msg: "incorrect credentials!" });
    }
  }
};

//
module.exports = { createAccountCont, loginUserCont };
