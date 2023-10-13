// import express
const express = require("express");

// import cors
const cors = require("cors");

//import logic
const logic = require("./services/logic");

//import jwt
const jwt = require("jsonwebtoken");

// create server application
const server = express();

// use cors
server.use(cors({ origin: "http://localhost:4200" }));

// returns middleware that parse json
server.use(express.json());

// setup port
server.listen(5000, () => {
  console.log("server listening on port 5000");
});

// api call
// server.get("/", (req, res) => res.send("Welcome to backend"));

// //
// server.post("/", (req, res) => {
//   console.log("server post");
// });

const jwtMiddleware = (req, res, next) => {
  console.log("Router level middleware");
  try {
    const token = req.headers["verify-token"];
    console.log(token);
    const data = jwt.verify(token, "superkey2023");
    console.log(data);
    req.currentAcno = data.loginAcno;
    next();
  } catch {
    res.status(401).json({ message: "Please login" });
  }
};

// server.use(appMiddleware);

//register

server.post("/register", (req, res) => {
  console.log("inside register API call");
  console.log(req.body);
  //logic to resolve register
  logic
    .register(req.body.username, req.body.acno, req.body.password)
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

//login

server.post("/login", (req, res) => {
  console.log("inside login API call");
  console.log(req.body);
  //logic to resolve register
  logic.login(req.body.acno, req.body.password).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

//balance

server.get("/getBalance/:acno", jwtMiddleware, (req, res) => {
  console.log("inside balance API call");
  console.log(req.params);
  logic.getBalance(req.params.acno).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

//fund transfer

server.post("/fundTransfer", jwtMiddleware, (req, res) => {
  console.log("inside fundTransfer API call");
  console.log(req.body);
  logic
    .fundTransfer(
      req.currentAcno,
      req.body.frompswd,
      req.body.toAcno,
      req.body.amount
    )
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

server.get("/transactions", jwtMiddleware, (req, res) => {
  console.log("inside transaction API call");
  logic.transactionHistory(req.currentAcno).then((response) => {
    res.status(response.statusCode).json(response);
  });
});
