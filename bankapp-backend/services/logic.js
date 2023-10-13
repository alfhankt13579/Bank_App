const { response } = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");

//logic for register
const register = (username, acno, password) => {
  return db.User.findOne({ acno }).then((response) => {
    console.log(response);
    if (response) {
      return {
        statusCode: 401,
        message: "acno already registered",
      };
    } else {
      const newUser = new db.User({
        username,
        acno,
        password,
        balance: 2000,
        transactions: [],
      });
      //store new user
      newUser.save();
      //send response back to client
      return {
        statusCode: 200,
        message: "registration successful",
      };
    }
  });
};

//logic for login

const login = (acno, password) => {
  return db.User.findOne({ acno, password }).then((response) => {
    // console.log(response);
    if (response) {
      //token generate
      const token = jwt.sign(
        {
          loginAcno: acno,
        },
        "superkey2023"
      );

      return {
        statusCode: 200,
        message: "login successfully",
        currentUser: response.username,
        currentBalance: response.balance,
        token,
        currentAcno: acno,
      };
    } else {
      //send response back to client
      return {
        statusCode: 401,
        message: "invalid login",
      };
    }
  });
};

//logic for balance
const getBalance = (acno) => {
  return db.User.findOne({ acno }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        balance: response.balance,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid acno",
      };
    }
  });
};

//logic for fund transfer
const fundTransfer = (fromAcno, frompswd, toAcno, amt) => {
  //convert
  let amount = parseInt(amt);
  return db.User.findOne({ acno: fromAcno, password: frompswd }).then(
    (debit) => {
      if (debit) {
        return db.User.findOne({ acno: toAcno }).then((credit) => {
          if (credit) {
            if (debit.balance >= amount) {
              debit.balance -= amount;
              debit.transactions.push({
                type: "debit",
                amount,
                fromAcno,
                toAcno,
              });
            } else {
              return {
                statusCode: 401,
                message: "insufficient funds",
              };
            }
            debit.save();
            credit.balance += amount;
            credit.transactions.push({
              type: "credit",
              amount,
              fromAcno,
              toAcno,
            });
            credit.save();
            return {
              statusCode: 200,
              message: "fund transfer successful",
            };
          } else {
            return {
              statusCode: 401,
              message: "invalid credit details",
            };
          }
        });
      } else {
        return {
          statusCode: 401,
          message: "invalid debit details",
        };
      }
    }
  );
};

const transactionHistory = (acno) => {
  //check acno available
  return db.User.findOne({ acno }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        transactions: result.transactions,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid data",
      };
    }
  });
};

module.exports = {
  register,
  login,
  getBalance,
  fundTransfer,
  transactionHistory,
};
