var commands = [];
var counter = 0;

$(".btn").on("click", start);

function start() {
  $(".btn").off("click", start);
  generateCommands();
}

function generateCommands() {
  var randomBtn = Math.floor(Math.random() * 4) + 1;
  commands.push(randomBtn);
  setTimeout(playCommands, 1000);
}

function playCommands() {
  for (let i = 0; i < commands.length; i++) {
    var whichButton;
    if (commands[i] === 1) {
      whichButton = ".green";
    } else if (commands[i] === 2) {
      whichButton = ".red";
    } else if (commands[i] === 3) {
      whichButton = ".yellow";
    } else {
      whichButton = ".blue";
    }
    $(whichButton).addClass("pressed");
    setTimeout(function() {
      $(whichButton).removeClass("pressed");
    }, 500);
    setTimeout(function() {
      whichButton = null;
    }, 1000);
  }
  $("#level-title").text("Your turn");
  debugger;
  checkCommands();
}

function checkCommands() {
  $(".btn").on("click", function(event) {
    checkEachCommand(event);
  });
}

function checkEachCommand(event) {
  if (event.currentTarget.classList[1] == commands[counter]) {
    counter++;
    if (counter === commands.length) {
      $(".btn").off("click", function(event) {
        checkEachCommand(event);
      });
      $("#level-title").text("Good Job! My turn");
      generateCommands();
    }
  } else {
    error();
  }
}

function error() {
  for (var i = 0; i < commands.length; i++) {
    commands.pop();
  }
  counter = 0;
  $("#level-title").text("WRONG! Press A Key to Start");
  $(".btn").on("click", start);
}
