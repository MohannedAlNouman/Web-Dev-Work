var drumArray = document.querySelectorAll(".drum");

for (var i = 0; i < drumArray.length; i++) {
  drumArray[i].addEventListener("click", function() {
    var buttonInnerHTML = this.innerHTML;
    playSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

document.addEventListener("keypress", function(test) {
  playSound(test.key);

  buttonAnimation(test.key);

});

function playSound(buttonInnerHTML) {
  switch (buttonInnerHTML) {
    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    case "l":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      // break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
      alert.log("hey there");
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    default:
      console.log(buttonInnerHTML);
      break;
  }
}

function buttonAnimation(currentKey) {
  document.querySelector("." + currentKey).classList.add("pressed");
  setTimeout(function() {
    document.querySelector("." + currentKey).classList.remove("pressed");
  }, 100);
}
