const express = require("express");
const router = express();
const { Login, Register } = require("../authentication-service/auth.controller");

router.get("/login", Login).get("/register", Register);

module.exports = router;
