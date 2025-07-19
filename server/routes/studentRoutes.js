const express = require("express");
const {
  registerStudent,
  getAllStudents,
  checkId,
} = require("../controllers/studentController");
const router = require("express").Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 13 * 1024 * 1024,
  },
});

router.route("/register").post(upload.single("file"), registerStudent);
router.route("/getAllStudents").get(getAllStudents);
router.route("/:studentId").get(checkId);
module.exports = router;
