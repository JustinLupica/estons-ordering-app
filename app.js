const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

const customerRouter = require("./routes/customers");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
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
    "SELECT id, customerName, pickupDate, size, flavor, specialInstructions FROM orderLog",
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

app.get("/order_preview/:id", (req, res) => {
  con.query("SELECT * FROM orderLog WHERE id = ?", [req.params.id], function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.log("Fetched order with ID: " + req.params.id);
    const resultArray = result;
    console.log(resultArray);
    res.render("order_preview", { resultArray: result });
    return;
  });
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

app.post("/order_create", function(req, res) {
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
  const secondColor = req.body.colorChoice2;
  const messageCard = req.body.messageCard;
  const specialInstructions = req.body.specialInstructions;
  const receiptNumber = req.body.receiptNumber;

  const queryString =
    "INSERT INTO orderLog (employee, pickupOrDelivery, pickupDate, deliveryDate, customerName, phoneNumber, productType, size, flavor, icing, roseColor1, roseColor2, messageCard, specialInstructions, receiptNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
      secondColor,
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
      res.redirect("/orders");
      return;
    }
  );
});
