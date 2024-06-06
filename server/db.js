const express = require("express");
const router = express.Router();
const pg = require("pg");

const client = new pg.Client("postgres://localhost/acme_store");
client.connect();
const getAllUsers = async () => {
  const response = await client.query(`SELECT * FROM user`);
  return response.rows;
};
module.export = {
  getAllUsers,
  client,
};
