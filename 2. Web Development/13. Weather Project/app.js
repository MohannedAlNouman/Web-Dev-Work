const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const loc = req.body.placeOfInterest;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=c5561c32f44089b38886e9ccab99479c&units=imperial";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherJSON = JSON.parse(data);
      const temperature = weatherJSON.main.temp;
      const weatherDescription = weatherJSON.weather[0].description;
      const icon = weatherJSON.weather[0].icon;
      const imageURL = "<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' alt='weatherIcon'>";
      res.write("<h1>The temperature in " + loc + " is " + temperature + " degrees farenheit.</h>");
      res.write("<h3>There are " + weatherDescription + "</h>")
      res.write(imageURL);
      res.end();
    })
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
