const express = require("express");
const router = express.Router();
const pg = require("pg");
const { client, getAllProducts, createProduct } = require("./db");

// get all products

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllProducts());
  } catch (err) {
    next(err);
  }
});
// create product

router.post("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO product(name) VALUES($1)`,
      [req.body.name]
    );
    res.send(await createProduct(req.body));
  } catch (err) {
    next(err);
  }
});
module.exports = router;
