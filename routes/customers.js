const express = require("express");
const router = express.Router();

//All customers Route
router.get("/", (req, res) => {
  res.render("customers");
});

//New Customer Route
router.get("/new", (req, res) => {
  res.render("new");
});

//Create Customer Route
router.post("/", (req, res) => {
  res.send("Create");
});

module.exports = router;
