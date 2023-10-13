//mongodb & nodejs connector

//connect library- mongoose -npm i mongoose

//import mongoose

const mongoose = require("mongoose");

// connect string

mongoose.connect("mongodb://127.0.0.1/BankApp");

//create model and schema for storing data

const User = mongoose.model("User", {
  username: String,
  acno: Number,
  password: String,
  balance: Number,
  transactions: [],
});

module.exports = { User };
