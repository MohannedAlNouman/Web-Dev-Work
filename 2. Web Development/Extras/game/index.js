var accelerationSetting = [];
var vMaxSetting = [];
var selector;
var pointsAllocated = 0;
var pointsAllocatedHTML = document.querySelector(".pointsAllocated");
var helicopterElement = document.querySelector(".helicopter");

var sonicAudio = new Audio("sonicAudioOnly.mp3");

for (var i = 0; i < 7; i++) {
  accelerationSetting[i] = false;
  vMaxSetting[i] = false;
}

function increase(array, num) {
  for (var i = 0; i < 7; i++) {
    if (array[i] == false) {
      array[i] = true;
      pointsAllocated++;
      pointsAllocatedHTML.innerHTML = pointsAllocated;
      if (num === 1) {
        selector = ".acceleration .box" + (i + 1);
      } else if (num === 2) {
        selector = ".Vmax .box" + (i + 1);
      }
      document.querySelector(selector).classList.toggle("visible");
      i = 7;
    }
  }
}

function decrease(array, num) {
  for (var i = 6; i >= 0; i--) {
    if (array[i] == true) {
      array[i] = false;
      pointsAllocated--;
      pointsAllocatedHTML.innerHTML = pointsAllocated;
      if (num === 1) {
        selector = ".acceleration .box" + (i + 1);
      } else if (num === 2) {
        selector = ".Vmax .box" + (i + 1);
      }
      document.querySelector(selector).classList.toggle("visible");
      i = -1;
    }
  }
}

document.querySelector(".acceleration .boxUp").addEventListener("click", pointCheckAccelerationSettingIncrease);
document.querySelector(".acceleration .boxDown").addEventListener("click", accelerationSettingDecrease);

document.querySelector(".Vmax .boxUp").addEventListener("click", pointCheckvMaxSettingIncrease);
document.querySelector(".Vmax .boxDown").addEventListener("click", vMaxSettingDecrease);

function pointCheckAccelerationSettingIncrease() {
  if (pointsAllocated === 10) {
    alert("You've already spent 10 points!");
  } else {
    increase(accelerationSetting, 1);
  }
}

function accelerationSettingDecrease() {
  decrease(accelerationSetting, 1);
}

function pointCheckvMaxSettingIncrease() {
  if (pointsAllocated === 10) {
    alert("You've already spent 10 points!");
  } else {
    increase(vMaxSetting, 2);
  }
}

function vMaxSettingDecrease() {
  decrease(vMaxSetting, 2);
}

document.querySelector(".lockIn").addEventListener("click", lockInValues);

function lockInValues() {
  sonicAudio.play();
  document.querySelector(".acceleration .boxUp").removeEventListener("click", pointCheckAccelerationSettingIncrease);
  document.querySelector(".acceleration .boxDown").removeEventListener("click", accelerationSettingDecrease);
  document.querySelector(".Vmax .boxUp").removeEventListener("click", pointCheckvMaxSettingIncrease);
  document.querySelector(".Vmax .boxDown").removeEventListener("click", vMaxSettingDecrease);
  document.querySelector(".lockIn").innerHTML = "Values have been locked in!";
  document.querySelector(".lockIn").removeEventListener("click", lockInValues);

  var velMax = 0;

  for (var i = 0; i < 7; i++) {
    if (vMaxSetting[i] == true) {
      velMax = (i + 1) * 200;
    } else if (vMaxSetting[i] == false) {
      velMax = i * 200;
      break;
    }
  }

  var accMax = 0;

  for (var i = 0; i < 7; i++) {
    if (accelerationSetting[i] == true) {
      accMax = (i + 1) * 200;
    } else if (accelerationSetting[i] == false) {
      accMax = i * 200;
      break;
    }
  }

  myHelicopter = new Helicopter(0, 0, 0, 0, velMax, accMax);
  playGame();
}

var myHelicopter = new Helicopter(0, 0, 0, 0, 0, 0);

var bar1 = new Barrier(0, 0, 0, ".bar1", false, 0);
var bar2 = new Barrier(0, 0, 0, ".bar2", false, 0);
var bar3 = new Barrier(0, 0, 0, ".bar3", false, 0);
var bar4 = new Barrier(0, 0, 0, ".bar4", false, 0);
var bar5 = new Barrier(0, 0, 0, ".bar5", false, 0);

// helicopter is 60px X 60px
function Barrier(heightTop, gap, heightBot, name, hasStarted, positionRight) {
  this.heightTop = heightTop;
  this.gap = gap;
  this.heightBot = heightBot;
  this.name = name;
  this.hasStarted = hasStarted;
  this.positionRight = positionRight;
}

function createBarrier(barrierNum) {
  barrierNum.gap = Math.random() * 60 + 120;
  barrierNum.heightTop = Math.random() * (800 - barrierNum.gap);
  barrierNum.heightBot = 800 - barrierNum.heightTop - barrierNum.gap;
  document.querySelector(barrierNum.name + "bottom").style.height = barrierNum.heightBot + "px";
  document.querySelector(barrierNum.name + "top").style.height = barrierNum.heightTop + "px";
  document.querySelector(barrierNum.name + "top").style.bottom = 60 + barrierNum.heightBot + barrierNum.gap + "px";
  barrierNum.hasStarted = true;
  barrierNum.positionRight = 0;
  document.querySelector(barrierNum.name + "bottom").style.visibility = "visible";
  document.querySelector(barrierNum.name + "top").style.visibility = "visible";
}

function moveBarrier() {
  if (bar1.hasStarted) {
    document.querySelector(bar1.name + "top").style.right = bar1.positionRight + "px";
    document.querySelector(bar1.name + "bottom").style.right = (bar1.positionRight + 6) + "px";
    bar1.positionRight += 5;
    if (bar1.positionRight >= 746) {
      document.querySelector(bar1.name + "bottom").style.visibility = "hidden";
      document.querySelector(bar1.name + "top").style.visibility = "hidden";
    }
  }
  if (bar2.hasStarted) {
    document.querySelector(bar2.name + "top").style.right = bar2.positionRight + "px";
    document.querySelector(bar2.name + "bottom").style.right = (bar2.positionRight + 6) + "px";
    bar2.positionRight += 5;
    if (bar2.positionRight >= 758) {
      document.querySelector(bar2.name + "bottom").style.visibility = "hidden";
      document.querySelector(bar2.name + "top").style.visibility = "hidden";
    }
  }
  if (bar3.hasStarted) {
    document.querySelector(bar3.name + "top").style.right = bar3.positionRight + "px";
    document.querySelector(bar3.name + "bottom").style.right = (bar3.positionRight + 6) + "px";
    bar3.positionRight += 5;
    if (bar3.positionRight >= 770) {
      document.querySelector(bar3.name + "bottom").style.visibility = "hidden";
      document.querySelector(bar3.name + "top").style.visibility = "hidden";
    }
  }
  if (bar4.hasStarted) {
    document.querySelector(bar4.name + "top").style.right = bar4.positionRight + "px";
    document.querySelector(bar4.name + "bottom").style.right = (bar4.positionRight + 6) + "px";
    bar4.positionRight += 5;
    if (bar4.positionRight >= 782) {
      document.querySelector(bar4.name + "bottom").style.visibility = "hidden";
      document.querySelector(bar4.name + "top").style.visibility = "hidden";
    }
  }
  if (bar5.hasStarted) {
    document.querySelector(bar5.name + "top").style.right = bar5.positionRight + "px";
    document.querySelector(bar5.name + "bottom").style.right = (bar5.positionRight + 6) + "px";
    bar5.positionRight += 5;
    if (bar5.positionRight >= 794) {
      document.querySelector(bar5.name + "bottom").style.visibility = "hidden";
      document.querySelector(bar5.name + "top").style.visibility = "hidden";
    }
  }
}

function Helicopter(spawnY, sizeX, sizeY, velY, velMaxY, accY) {
  this.spawnY = spawnY;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.velY = velY;
  this.velMaxY = velMaxY;
  this.accY = accY;
}

var refreshDelay = 50;

async function playGame() {
  while (true) {
    moveHelicopter();
    if (started) {
      score++;
      document.querySelector(".score").innerHTML = "Current score: " + score;
    }
    if ((score + 750) % 800 == 0) {
      createBarrier(bar1);
    } else if ((score + 590) % 800 == 0) {
      createBarrier(bar2);
    } else if ((score + 430) % 800 == 0) {
      createBarrier(bar3);
    } else if ((score + 270) % 800 == 0) {
      createBarrier(bar4);
    } else if ((score + 110) % 800 == 0) {
      createBarrier(bar5);
    }
    moveBarrier();
    collisionDetection();
    await sleep(refreshDelay);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector(".gas").addEventListener("mousedown", accelerating);
document.querySelector(".gas").addEventListener("mouseup", falling);

function accelerating() {
  currentAcceleration = myHelicopter.accY - 500;
  started = true;
  document.querySelector(".gas").style.backgroundColor = "yellow";
}

function falling() {
  currentAcceleration = -500;
  document.querySelector(".gas").style.backgroundColor = "grey";
}

var vFinal = 0;
var vInitial = 0;
var vAverage = 0;
var displacement = 0;
var distanceYInitial = 0;
var distanceYFinal = 0;
var finalDisplacement;
var currentAcceleration = 0;
var started = false;
var score = 0;
var highscore = 0;

function moveHelicopter() {
  vInitial = vFinal;
  vFinal = currentAcceleration * .020 + vInitial;
  if (vFinal > myHelicopter.velMaxY) {
    vFinal = myHelicopter.velMaxY;
  }
  if (vFinal < (-myHelicopter.velMaxY)) {
    vFinal = -myHelicopter.velMaxY;
  }
  vAverage = (vInitial + vFinal) / 2;
  displacement = vAverage * .020;
  distanceYInitial = distanceYFinal;
  distanceYFinal = distanceYInitial + displacement;
  finalDisplacement = (740 - distanceYFinal) + "px";
  helicopterElement.style.top = finalDisplacement;

  if ((finalDisplacement.substr(0, 3) > 740) || (finalDisplacement.substr(0, 3) < 0)) {
    crashed();
  }
}

function crashed() {
  {
    sonicAudio.pause();
sonicAudio.currentTime = 0;
    alert("you crashed");
    helicopterElement.style.top = "740px";
    currentAcceleration = 0;
    vFinal = 0;
    distanceYFinal = 0;
    started = false;
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").innerHTML = "Highscore: " + highscore;
    }
    score = 0;
    document.querySelector(".score").innerHTML = "Current score: " + score;

    for (var i = 1; i <= 5; i++) {
      document.querySelector(".bar" + i + "top").style.visibility = "hidden";
    }
    for (var i = 1; i <= 5; i++) {
      document.querySelector(".bar" + i + "bottom").style.visibility = "hidden";
    }
    bar1.positionRight = 0;
    bar2.positionRight = 0;
    bar3.positionRight = 0;
    bar4.positionRight = 0;
    bar5.positionRight = 0;

    bar1.hasStarted = false;
    bar2.hasStarted = false;
    bar3.hasStarted = false;
    bar4.hasStarted = false;
    bar5.hasStarted = false;
  }
}

function collisionDetection() {
  if ((bar1.positionRight >= 479) && (bar1.positionRight <= 538)) {
    if ((distanceYFinal < bar1.heightBot) || ((distanceYFinal + 60) > (800 - bar1.heightTop))) {
      crashed();
    }
  }
  if ((bar2.positionRight >= 491) && (bar2.positionRight <= 550)) {
    if ((distanceYFinal < bar2.heightBot) || ((distanceYFinal + 60) > (800 - bar2.heightTop))) {
      crashed();
    }
  }
  if ((bar3.positionRight >= 503) && (bar3.positionRight <= 562)) {
    if ((distanceYFinal < bar3.heightBot) || ((distanceYFinal + 60) > (800 - bar3.heightTop))) {
      crashed();
    }
  }
  if ((bar4.positionRight >= 515) && (bar4.positionRight <= 574)) {
    if ((distanceYFinal < bar4.heightBot) || ((distanceYFinal + 60) > (800 - bar4.heightTop))) {
      crashed();
    }
  }
  if ((bar5.positionRight >= 527) && (bar5.positionRight <= 586)) {
    if ((distanceYFinal < bar5.heightBot) || ((distanceYFinal + 60) > (800 - bar5.heightTop))) {
      crashed();
    }
  }
}
