const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

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
  console.log(req.body.name + " " + req.body.devoured)
  burger.create([
    "burger_name", " devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    console.log(req.body.name + req.body.devoured)
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
