const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mohanned:Test123@cluster0.fef20.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todo list."
});
const item2 = new Item({
  name: "Hit the + to add an item."
});
const item3 = new Item({
  name: "Hit the checkbox to delete an item."
});
const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});
const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {
  Item.find({}, function(err, itemsDB) {
    if (err) {
      console.log(err + "error1 showing")
    } else if (itemsDB.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err + "error2 showing");
        } else {
          console.log("Default items added successfully.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        listItems: itemsDB,
      });
    }
  });
});

app.get("/:dynamicList", function(req, res) {
  const dynList = req.params.dynamicList;
  const dynamicList = _.capitalize(dynList);

  List.findOne({
    name: dynamicList
  }, function(err, results) {

    if (!err) {
      if (!results) {
        const list = new List({
          name: dynamicList,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + dynamicList);
      } else {
        res.render("list", {
          listTitle: results.name,
          listItems: results.items
        });
      }
    } else {
      console.log(err + " showing error 3");
    }
  });
});

app.post("/", function(req, res) {

  const listName = req.body.list;
  const item = req.body.newItem;

  const newItem = new Item({
    name: item
  })

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, results) {
      if (err) {
        console.log(err + " showing error 4");
      } else {
        results.items.push(newItem);
        results.save();
        res.redirect("/" + listName);
      }
    });
  }
});

app.post("/delete", function(req, res) {
  const checkedItemID = req.body.checkbox;
  const listName = req.body.list;

  if (listName === "Today") {
    Item.deleteOne({
      _id: checkedItemID
    }, function(err) {
      if (err) {
        console.log(err + " showing error 5");
      } else {
        res.redirect("/");
      }
    })
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemID
        }
      }
    }, function(err, results) {
      if (!err) {
        res.redirect("/" + listName);
      } else {
        console.log(err + " showing error 6");
      }
    });
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
