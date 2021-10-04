const express = require("express");
const cors = require("cors");
const router = require("./router");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
  await db();
});
