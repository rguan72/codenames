import firebase_ from "./Firebase";

function logNewGame() {
  firebase_.analytics().logEvent("game_created");
}

function logJoinGame() {
  firebase_.analytics().logEvent("player_joined");
}

function logRejoinGame() {
  firebase_.analytics().logEvent("game_rejoined");
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

function logClassicWords() {
  firebase_.analytics().logEvent("classic_words");
}

function logValentineWords() {
  firebase_.analytics().logEvent("valentine_words");
}

function logEECSWords() {
  firebase_.analytics().logEvent("eecs_words");
}

export {
  logNewGame,
  logJoinGame,
  logGameStarted,
  logGameCompleted,
  logPlayAgain,
  logRejoinGame,
  logClassicWords,
  logValentineWords,
  logEECSWords
};
