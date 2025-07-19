const express = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/authController");

const router = require("express").Router();
router.route("/").post(register);
router.route("/login").post(login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;
