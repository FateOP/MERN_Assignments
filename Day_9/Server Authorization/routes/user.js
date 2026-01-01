const express = require("express");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const pool = require('../db/pool')
const result = require("../utils/result");
const config = require("../utils/config");
const { checkAuthorization } = require("../utils/auth");

const router = express.Router();

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = cryptojs.SHA256(password).toString();
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  pool.query(sql, [email, hashedPassword], (error, data) => {
    if (error) res.send(result.createResult(error));
    else if (data.length == 0)
      res.send(result.createResult("Invalid email or password"));
    else {
      const user = data[0];
      console.log("user", user);

      // create the JWT token
      // inside the payload store the data that needs to be encryted into the token
      const payload = {
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, config.SECRET);
      const userData = {
        name: user.name,
        mobile: user.mobile,
        token,
      };
      res.send(result.createResult(null, userData));
    }
  });
});

// get details by email (student)
router.get("/", (req, res) => {
  const email = req.headers.email;
  const sql = `SELECT * FROM users WHERE email = ?`;
  pool.query(sql, [email], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

// get all students (admin)
router.get("/all-students", checkAuthorization, (req, res) => {
  // const email = req.headers.email;
  const sql = `SELECT * FROM users`;
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.delete("/", (req, res) => {
  const uid = req.headers.uid;
  const sql = `DELETE FROM users WHERE uid = ?`;
  pool.query(sql, [uid], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

module.exports = router;
