import firebase_ from "./Firebase";

function logNewGame() {
  firebase_.analytics().logEvent("game_created");
}

function logJoinGame() {
  firebase_.analytics().logEvent("player_joined");
}

function logGameStarted() {
  firebase_.analytics().logEvent("game_started");
}

function logGameCompleted() {
  firebase_.analytics().logEvent("game_completed");
}

function logPlayAgain() {
  firebase_.analytics().logEvent("played_again");
}


export {
  logNewGame, logJoinGame, logGameStarted, logGameCompleted, logPlayAgain
};
