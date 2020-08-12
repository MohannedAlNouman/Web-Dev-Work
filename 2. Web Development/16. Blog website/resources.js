app.get("/", function(req, res) {
  Default.find({}, function(err, defaultDB) {
    if (defaultDB.length === 0) {
      const homeContent = new Default({
        section: "homeSection",
        content: homeStartingContent
      })
      homeContent.save();
      res.redirect("/");
    } else {
      res.render("home", {
        homeInfo: "Home",
        posts: posts
      });
    }
  });
});
