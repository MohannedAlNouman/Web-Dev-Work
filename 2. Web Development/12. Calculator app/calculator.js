const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  let bmi = Number(req.body.num1) + Number(req.body.num2);
  res.send("Thanks for posting that. The solution is " + bmi);
});

app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res) {
  let value = Math.floor(Number(req.body.weight) / Math.pow(Number(req.body.height), 2));
  res.send("Your BMI is " + value);
});

app.listen("3000", function() {
  console.log("Now listening to port 3000");
});
