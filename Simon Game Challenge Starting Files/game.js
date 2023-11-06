var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function(){
if (started === false){
    started = true;
    $("h1").text("Level "+level);
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(this);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(210).fadeIn(210); //flash buttons

  playSound(randomChosenColor); //play sound
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();//play sound on clicking respective button
}

function animatePress(name) {  //flash animation of button
  $(name).addClass("pressed");
  setTimeout(function() {
    $(name).removeClass("pressed");
  }, 100)
}


function checkAnswer(currentIndex) {
      if(gamePattern[currentIndex]===userClickedPattern[currentIndex])
      {
        if(gamePattern.length===userClickedPattern.length){
           setTimeout(function (){
            nextSequence();
          },1000);
        }
      }
      else
      {
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function (){
            $("body").removeClass("game-over");
          },200);
          $("h1").text("Game Over,Press any key to restart");
          startOver();
      }
  }

  function startOver(){  //restart game
    started=false;
    level=0;
    gamePattern=[];
  }
