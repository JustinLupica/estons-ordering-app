const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const app = express();
const ejse = require("ejs-electron");
const bodyParser = require("body-parser");

const customerRouter = require("./routes/customers");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("scripts"));
app.use(bodyParser.urlencoded({ entended: false }));

app.use("/customers", customerRouter);

var server = app.listen(8080, function() {
  console.log("Listening to Port 8080");
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ferichnia",
  database: "Orders"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to SQL DB");
});

app.get("/orders", function(req, res) {
  con.query(
    "SELECT customerName, pickupDate, size, flavor, specialInstructions FROM orderLog",
    function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      const orderArray = result;
      res.render("OrderLog", { orderArray });
      return;
    }
  );
});

app.get("/customerlookup", function(req, res) {
  con.query("SELECT * FROM customers", function(err, result, fields) {
    if (err) throw err;
    console.log(result);

    const resultArray = result;
    console.log(resultArray);
    res.render("customers", { resultArray });
    return;
  });
});

app.get("/", (req, res) => {
  res.render("NewOrder");
  return;
});

app.get("/NewOrder", (req, res) => {
  res.render("NewOrder");
  return;
});

app.post("/data", function(req, res) {
  const customerName = req.body.customersName;
  const phoneNumber = req.body.phoneNumber;
  const queryString = "INSERT INTO customers (name, phoneNumber) VALUES (?, ?)";
  con.query(
    queryString,
    [customerName, phoneNumber],
    (err, results, fields) => {
      if (err) {
        console.log("Failed " + err);
        return;
      }
      console.log("Inserted a new customer!");
      res.redirect("/customerlookup");
      return;
    }
  );
});

app.post("/order_create", function(res, res) {
  const employee = req.body.employee;
  const fulfillment = req.body.pickupOrDelivery;
  const pickupDate = req.body.pickupDate;
  const deliveryDate = req.body.deliveryDate;
  const name = req.body.customersName;
  const phoneNumber = req.body.phoneNumber;
  const type = req.body.productType;
  const size = req.body.productSize;
  const flavor = req.body.productFlavor;
  const icing = req.body.icing;
  const firstRose = req.body.roseColor1;
  const secondRose = req.body.roseColor2;
  const messageCard = req.body.messageCard;
  const specialInstructions = req.body.specialInstructions;
  const receiptNumber = req.body.receiptNumber;

  const queryString =
    "INSERT INTO orderLog (dateOrderTaken, employee, pickupOrDelivery, pickupDate, deliveryDate, customerName, phoneNumber, productType, size, flavor, icing, roseColor1, roseColor2, sprinkles, messageCard, specialInstructions, receiptNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  con.query(
    queryString,
    [
      employee,
      fulfillment,
      pickupDate,
      deliveryDate,
      name,
      phoneNumber,
      type,
      size,
      flavor,
      icing,
      firstRose,
      secondRose,
      messageCard,
      specialInstructions,
      receiptNumber
    ],
    (err, results, fields) => {
      if (err) {
        console.log("Failed " + err);
        return;
      }
      console.log("Successfully Logged new Order!");
      return;
    }
  );
});
