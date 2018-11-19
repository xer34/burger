var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/api/burger", function(req, res) {
  burger.all(function(data) {
    res.json({
      burger: data
    });
  });
});

router.get("/api/burger/:id", function(req, res) {
  burger.all(function(data) {
    res.json({
      burger: data[req.params.id - 1]
    });
  });
});

router.post("/api/burger", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

module.exports = router;
