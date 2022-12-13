var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  database: "YogaClass",
  user: "root",
  password: "admin1234",
  port: "3306",
});

module.exports = connection;
