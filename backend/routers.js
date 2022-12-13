const express = require("express");
const connection = require("./database");
const router = express.Router();

router.get("/fetchUserData", async (req, res) => {
  let sql = "SELECT * FROM Enrolled";
  await connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

const elligible = (data) => {
  let age = parseInt(data.age);
  if (age >= 18 && age <= 65) {
    return true;
  }
  return false;
};

router.post("/EnrollAndPayment", async (req, res) => {
  const data = req.body;
  console.log(data);
  let sql = `INSERT INTO Enrolled (Name,email,phone,age,Address,City,State,Country,batch) VALUES ("${data.name}","${data.email}","${data.phone}","${data.age}","${data.address}","${data.city}","${data.state}","${data.country}","${data.batch}");`;
  console.log(sql);
  await connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Enrolled and payment successful");
  });
});

module.exports = router;
