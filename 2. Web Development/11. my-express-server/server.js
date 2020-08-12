const express = require('express');
const app = express();

app.get("/", function(req, res){
res.send("<h1>Hellooooooooo world!</h1>");
});

app.get("/contact", function(req, res){
  res.send("contact me at fakeemail@gmail.com");
});

app.get("/about", function(req, res){
  res.send("testing");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
