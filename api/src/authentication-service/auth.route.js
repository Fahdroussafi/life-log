const express = require("express");
const router = express();
const { Login, Register } = require("../authentication-service/auth.controller");

router.post("/login", Login).post("/register", Register);

module.exports = router;
