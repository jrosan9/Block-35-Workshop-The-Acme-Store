const express = require("express");
const { client } = require("./db");
const app = express();
const baseQuery = `/api/`;
app.use(express.json());
client.connect();

app.get(baseQuery, (req, res) => {
  res.json({
    success: true,
  });
});
app.use(baseQuery + "user", require("../server/user"));
app.use(baseQuery + "product", require("../server/products"));
app.use(baseQuery + "favorites", require("../server/favorites"));

app.listen(7070, () => {
  console.log("App is running at port 7070");
});
