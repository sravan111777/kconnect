const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();
const { db } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
  await db();
});
