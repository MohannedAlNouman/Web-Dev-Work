const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
// app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const wikiSchema = mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", wikiSchema);


/////////////////////////// All article requests ///////////////////////////

app.route("/articles")

  .get(function(req, res) {
    Article.find(function(err, result) {
      if (!err) {
        res.send(result);
      } else {
        res.send(err)
      }
    });
  })

  .post(function(req, res) {
    const newArticle = new Article({
      title: _.capitalize(req.body.title),
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("Success");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.")
      } else {
        res.send(err);
      }
    });
  });


/////////////////////////// Specific article requests ///////////////////////////

app.route("/articles/:article")

  .get(function(req, res) {
    const article = _.capitalize(req.params.article);
    Article.findOne({
      title: article
    }, function(err, result) {
      if (result) {
        res.send(result);
      } else {
        res.send("No matching articles found.");
      }
    });
  })

  .put(function(req, res) {
    const article = _.capitalize(req.params.article);
    Article.update({
      title: article
    }, {
      title: _.capitalize(req.body.title),
      content: req.body.content
    }, {
      overwrite: true
    }, function(err) {
      if (!err) {
        res.send("Successfully updated the article");
      } else {
        res.send(err);
      }
    });
  })

  .patch(function(req, res) {
    const article = _.capitalize(req.params.article);
    Article.update({
      title: article
    }, {
      $set: req.body
    }, function(err) {
      if (!err) {
        res.send("Successfully updated the specified fields of the article");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    const article = _.capitalize(req.params.article);
    Article.deleteOne({
      title: article
    }, function(err) {
      if (!err) {
        res.send("Successfully deleted article: " + article);
      } else {
        res.send(err);
      }
    });
  });




app.listen(3000, function() {
  console.log("Server has started on port 3000");
});
