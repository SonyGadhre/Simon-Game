var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;


$(document).keypress(function() {

  if(!started) {
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); //here this holds the identity of the button that is being clicked
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  // if statement to check the most recent answer
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");

    //if atatement to check if the user has finished their answer
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");
    var audio2 = new Audio("sounds/wrong.mp3");
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
    audio2.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var num = Math.random();
  num = num * 4;
  num = Math.floor(num);
  var randomChosenColor = buttonColors[num];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function startOver(){
   level = 0 ;
   gamePattern = [];
   started = false;

}



function playSound(name) {

  var audio1 = new Audio("sounds/" + name + ".mp3");
  audio1.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
