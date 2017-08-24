//Business logic
function Player(number){
  this.playerNumber = number;
  this.score = 0;
  this.roll = 0;
  this.turnScore = 0;
  this.name = "Player " + number;
};

Player.prototype.rollDie = function(){
  this.roll = Math.ceil(Math.random() * 6);
  this.turnScore += this.roll;
}
var player1 = new Player(1);
var player2 = new Player(2);
var playerCounter = 1;
var currentPlayer = player1;

//Press the roll button...if one-loose turn...else continue playing

var dieRoller = function(){
  checkCurrentPlayer();
  currentPlayer.rollDie();
  listAppender();
  if (currentPlayer.roll === 1) {
    currentPlayer.turnScore = 0;
    playerCounter++;
    listClearer();
    checkCurrentPlayer();

    return "SORRY! You rolled a 1. You're turn is over and you don't get any points for the turn.";
  } else {
    return "You rolled a " + currentPlayer.roll + ". Your score for the turn is now " + currentPlayer.turnScore + ". Click 'Roll' or 'Hold' to continue.";
  }
};

//Press the Hold button...total for that group of rolls adds to player total...Next persons turn

var turnHolder = function(){
  currentPlayer.score += currentPlayer.turnScore;
  var returnString = "";
  if(currentPlayer.score >= 10){
    winnerPopUp();
    returnString = "Click 'New' to play again";
  }else{
    returnString = "Total of " + currentPlayer.turnScore + " has been added to your score. It's next Player's turn.";
  }
  currentPlayer.turnScore = 0;
  listClearer();
  playerCounter++;
  checkCurrentPlayer();
  return returnString;
}

//Hit the reset button...evetything clears out and new game begins

var reseter = function(){
  player1 = new Player(1);
  player2 = new Player(2);
  playerCounter = 1;
  checkCurrentPlayer();
  popUpHider();
  return("");
}
//Check to see which player is playing
var checkCurrentPlayer = function(){
  if (playerCounter % 2 === 1){
    currentPlayer = player1;
  } else {
    currentPlayer = player2;
  }
};


//User Intreface Logic
var listAppender = function(){
  $("#player" + currentPlayer.playerNumber + "List").append("<li>" + currentPlayer.roll + "</li>");
}
var listClearer = function(){
  $("#player" + currentPlayer.playerNumber + "List").text("");
}


$(document).ready(function(){

//output information for the roll button
  $("#roll-die").submit(function(event){
    event.preventDefault();
    $("#output").text(dieRoller());

    $("#currentPlayer").text(currentPlayer.name);
  });
//output information for the hold button
  $("#hold").submit(function(event){
    event.preventDefault();
    $("#output").text(turnHolder());
    $("#pOneScore").text(player1.score);
    $("#pTwoScore").text(player2.score);
    $("#currentPlayer").text(currentPlayer.name);
  });
//output for the reset button
  $("#reset").submit(function(event){
    event.preventDefault();
    listClearer();
    $("#output").text(reseter);
    $("#currentPlayer").text("Player 1");
    $("#pOneScore").text(player1.score);
    $("#pTwoScore").text(player2.score);
  });
});

function winnerPopUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function popUpHider() {
    var popup = document.getElementById("myPopup");
    popup.classList.remove("show");
}
