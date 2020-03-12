const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ferichnia",
  database: "Orders"
});

mysqlConnection.connect(err => {
  if (!err) console.log("DB connection succeeded!");
  else
    console.log(
      "DB connection failed.. \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

app.listen(3000, () =>
  console.log("Express Server is running at port number 3000")
);

// Get all customers from DB
app.get("/customers", (req, res) => {
  mysqlConnection.query("SELECT * FROM customers", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

var myArray = [];

buildTable(myArray);

function buildTable(data) {
  var table = document.getElementById("table");

  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].phoneNumber}</td>
        </tr>`;

    table.innerHTML += row;
  }
}

// Get a customer from DB
app.get("/customers/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM customers WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Delete a customer from DB
app.get("/customers/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM customers WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
