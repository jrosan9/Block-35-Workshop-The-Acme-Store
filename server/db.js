const express = require("express");
const router = express.Router();
const pg = require("pg");

const client = new pg.Client("postgres://localhost/acme_store");
// client.connect();
const getAllUsers = async () => {
  const response = await client.query(`SELECT * FROM users`);
  return response.rows;
};

const getAllProducts = async () => {
  const response = await client.query(`SELECT * FROM product`);
  return response.rows;
};
const getAllFavorites = async () => {
  const response = await client.query(`SELECT * FROM favorites`);
  return response.rows;
};

const getFavoriteByUserId = async (params_id) => {
  const response = await client.query(`SELECT * FROM users WHERE id= $1`, [
    params_id,
  ]);
  const { id, username } = response.rows[0];
  const favorite_res = await client.query(
    `SELECT * FROM favorites WHERE users_id = $1`,
    [params_id]
  );
  return {
    id,
    username,
    favorite: favorite_res.rows[0],
  };
};
const createUser = async (body) => {
  const response = await client.query(
    `INSERT INTO users(username, password) VALUES($1, $2)`,
    [body.username, body.password]
  );
  return {
    username: body.username,
    password: body.password,
  };
};
const createProduct = async (body) => {
  const response = await client.query(`INSERT INTO product(name) VALUES($1)`, [
    body.name,
  ]);
  return {
    name: body.name,
  };
};

module.exports = {
  getAllUsers,
  getAllProducts,
  getAllFavorites,
  getFavoriteByUserId,
  createUser,
  createProduct,
  client,
};
