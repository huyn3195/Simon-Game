var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //animation when sequence start
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function () {
  var button = $(this);
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
$("body").keypress(function () {
  if (!started) {
    // Check if the game has started
    $("h1").text("Level " + level);
    nextSequence();
    started = true; // Set started to true when the game starts
  }
});

function checkAnswer(currentLvl) {
  if (userClickedPattern[currentLvl] === gamePattern[currentLvl]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = false;
  userClickedPattern = [];
  level = 0;
  gamePattern = [];
}
