//requires the Mongoose NPM
const mongoose = require("mongoose");

//Connects to the MongoDB
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//creates schema for your collection with the specified fields and value types
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "whats the name??!!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//creates your collection. Param1 = Name of collection (usually in singular tense).
//Mongoose will lowercase your collection name (using lodash) and pluralize it.
//Param2 = Which schema to use.
const Fruit = mongoose.model("Fruit", fruitSchema);

//Creating a document of the specified collection
const fruit1 = new Fruit({
  name: "newJohn",
  review: "lets asdsasee if this works",
  rating: 1
});

const fruit2 = new Fruit({
  name: "Jill",
  rating: 4,
  review: "yes"
});

const fruit3 = new Fruit({
  name: "Jack",
  rating: 6,
  review: "nice"
});

//inserts your fruit document in your Fruit collection of your fruitsDB
fruit1.save();

//inserts your fruit documents included in your array (param1) to the specified collection and DB.
//param2 is a callback function which can confirm successful or unsuccesful exection of code.
Fruit.insertMany([fruit1, fruit2, fruit3], function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully saved all fruits to fruitsDB");
  }
});

//updates the specified value of the document
//param1 = the search criteria. param2 = what values you want to update,
//param3 = callback function to handle errors.
Fruit.updateOne({
  _id: "5f2c335482f60a28047141e4"
}, {
  rating: 6,
  review: "I suck"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("updated successfully");
  }
});

//deletes the selected document
//param1 = search criteria. param2 = callback function to handle errors.
Fruit.deleteOne({
  name: "Apple"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("deleted1 successfully");
  }
});

Fruit.deleteOne({
  _id: "5f2c335582f60a28047141e6"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("deleted2 successfully");
  }
});

//deletes all specified documents that match the search criteria.
//param1 = search criteria. param2 = callback function to handle errors.
Fruit.deleteMany({
  name: "John",

}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("i deleted something");
    mongoose.connection.close();
  }
});

//searches your database
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
    mongoose.connection.close();
  }
});

//relationships. You can embed a document in the field of another document.
//If you save them to their respective collections, the fruitID will be the same as in the person's favoriteFruit value.
const johnsFruit = new Fruit({
  name: "Pineapple",
  rating: 5,
  review: "I eat it everyday!"
});

johnsFruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema);

const amy = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: johnsFruit
});

amy.save();
