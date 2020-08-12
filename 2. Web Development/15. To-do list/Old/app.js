const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

const newItems = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", function(req, res) {
  const day = date.getDay();
  res.render('list', {
    listTitle: day,
    newListItems: newItems,
    postLocation: "/"
  });
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  newItems.push(item);
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
    postLocation: "/work"
  });
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening to port 3000");
});
