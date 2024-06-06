const express = require("express");
const router = express.Router();
const pg = require("pg");
const { getAllUsers } = require("./db");

const client = new pg.Client("postgres://localhost/acme_store");
client.connect();
// get all users

router.get("/", async (req, res, next) => {
  try {
    // const response = await client.query(`SELECT * FROM user`);
    // res.send(response.rows);
    res.send(await getAllUsers());
  } catch (err) {
    next(err);
  }
});
module.exports = router;
