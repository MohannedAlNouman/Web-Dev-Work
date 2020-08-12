var dice1 = Math.floor(Math.random() * 6) + 1;
var dice2 = Math.floor(Math.random() * 6) + 1;
var decider = dice1 - dice2;

for (var i = 0; i < 6; i++) {
  if (dice1 === 1) {
    document.querySelector(".dice1").setAttribute("src", "images/dice1.png");
  } else if (dice1 === 2) {
    document.querySelector(".dice1").setAttribute("src", "images/dice2.png");
  } else if (dice1 === 3) {
    document.querySelector(".dice1").setAttribute("src", "images/dice3.png");
  } else if (dice1 === 4) {
    document.querySelector(".dice1").setAttribute("src", "images/dice4.png");
  } else if (dice1 === 5) {
    document.querySelector(".dice1").setAttribute("src", "images/dice5.png");
  } else {
    document.querySelector(".dice1").setAttribute("src", "images/dice6.png");
  }
}

for (var i = 0; i < 6; i++) {
  if (dice2 === 1) {
    document.querySelector(".dice2").setAttribute("src", "images/dice1.png");
  } else if (dice2 === 2) {
    document.querySelector(".dice2").setAttribute("src", "images/dice2.png");
  } else if (dice2 === 3) {
    document.querySelector(".dice2").setAttribute("src", "images/dice3.png");
  } else if (dice2 === 4) {
    document.querySelector(".dice2").setAttribute("src", "images/dice4.png");
  } else if (dice2 === 5) {
    document.querySelector(".dice2").setAttribute("src", "images/dice5.png");
  } else {
    document.querySelector(".dice2").setAttribute("src", "images/dice6.png");
  }
}

if (decider === 0) {
  document.querySelector("h1").innerHTML = "Draw!";
} else if (decider > 0) {
  document.querySelector("h1").innerHTML = "<i class='moFlag fa fa-flag'></i> Player 1 wins!";
} else {
  document.querySelector("h1").innerHTML = "Player 2 wins! <i class='moFlag fa fa - flag'></i>";
}
