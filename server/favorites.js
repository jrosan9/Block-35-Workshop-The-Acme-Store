const express = require("express");
const router = express.Router();
const pg = require("pg");
const { client, getAllFavorites } = require("./db");

// get all favorites

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllFavorites());
  } catch (err) {
    next(err);
  }
});
module.exports = router;
