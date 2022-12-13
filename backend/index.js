const express = require("express");
const app = express();
const router = require("./routers");
const mysql = require("mysql");
const connection = require("./database");

require("dotenv").config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connection successful");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT} `);
});
