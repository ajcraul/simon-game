buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//user chosen pattern

$('.btn').click(function () {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    // console.log(userClickedPattern);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
    if (gamePattern [currentLevel] === userClickedPattern[currentLevel]) {
     console.log ("success");
         if (userClickedPattern.length === gamePattern.length){
             setTimeout(function() {
                 nextSequence();
             }, 1000);
         }
    } else {
     console.log ("wrong");
     playSound("wrong")
     $('body').addClass('game-over');
     $("#level-title").text("Game Over, Press Any Key to Restart");
     
      setTimeout(function() {
        $('body').removeClass('game-over')
     }, 200);

     startOver();

    };

};


//randomized sequence of game

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    // let audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    // audio.play();

};

//sound to button clicks

function playSound(name) {

    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

};

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');

    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);

};

   
  // Reset every variable -------------
   
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
