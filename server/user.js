const express = require("express");
const router = express.Router();
const pg = require("pg");
const {
  getAllUsers,
  getFavoriteByUserId,
  client,
  createUser,
} = require("./db");

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
router.get("/:id/favorites", async (req, res, next) => {
  try {
    res.send(await getFavoriteByUserId(req.params.id));
  } catch (err) {
    next(err);
  }
});
router.post("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO users(username, password) VALUES($1, $2)`,
      [req.body.username, req.body.password]
    );
    // res.send({
    //   username: req.body.username,
    //   password: req.body.password,
    // });
    res.send(await createUser(req.body));
  } catch (err) {
    next(err);
  }
});
module.exports = router;
