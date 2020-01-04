import firebase from "firebase/app";
import firebase_ from "./Firebase";
import { wordList } from "./wordList";
import { teams, roles } from "./constants";


function genCode() {
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    const randint = Math.floor(Math.random() * 36);
    const asciiOffset = 87;
    if (randint < 10) code += randint;
    else code += String.fromCharCode(randint + asciiOffset);
  }
  return code;
}

function randomString(length, chars) {
  let result = "";
  for (let i = length; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
function addPlayer(gameCode, name) {
  const db = firebase_.firestore();
  const id = randomString(20, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  db.collection("players")
    .doc(id)
    .set({
      name,
      gameCode,
      team: teams.RED,
      role: roles.SPYMASTER,
      ready: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      db
        .collection("games")
        .doc(gameCode)
        .update({
          players: firebase.firestore.FieldValue.arrayUnion(id),
          numPlayers: firebase.firestore.FieldValue.increment(1),
        });
    })
    .catch(err => console.log(err));
  return id;
}

function addWords(gameCode, redTurn) {
  const arr = [];
  while (arr.length < 20) {
    const idx = Math.floor(Math.random() * 673);
    if (arr.indexOf(idx) === -1) arr.push(idx);
  }
  const db = firebase_.firestore();
  const wordHashes = [];
  const promises = [];
  promises.push(
    db
      .collection("words")
      .add({
        value: wordList[arr[0]],
        type: "BLACK",
        flipped: false,
        gameCode,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(ref => wordHashes.push(ref.id))
  );
  for (let i = 1; i < 5; i += 1) {
    promises.push(
      db
        .collection("words")
        .add({
          value: wordList[arr[i]],
          type: "BEIGE",
          flipped: false,
          gameCode,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(ref => wordHashes.push(ref.id))
    );
  }
  for (let i = 5; i < 12; i += 1) {
    promises.push(
      db
        .collection("words")
        .add({
          value: wordList[arr[i]],
          type: "RED",
          flipped: false,
          gameCode,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(ref => wordHashes.push(ref.id))
    );
  }
  for (let i = 12; i < 19; i += 1) {
    promises.push(
      db
        .collection("words")
        .add({
          value: wordList[arr[i]],
          type: "BLUE",
          flipped: false,
          gameCode,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(ref => wordHashes.push(ref.id))
    );
  }
  promises.push(
    db
      .collection("words")
      .add({
        value: wordList[arr[19]],
        type: redTurn ? "RED" : "BLUE",
        flipped: false,
        gameCode,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(ref => wordHashes.push(ref.id))
  );
  return Promise.all(promises).then(() => db
    .collection("games")
    .doc(gameCode)
    .set({ words: wordHashes }, { merge: true })).catch(err => console.log(err));
}

function createGame(name) {
  const db = firebase_.firestore();
  const gameCode = genCode();
  //   while (!newCode) {
  const docRef = db.collection("games").doc(gameCode);
  const redTurn = Math.random() > 0.5;
  docRef.get().then(doc => {
    if (!doc.exists || doc.data().active === false) {
      docRef.set({
        redTurn,
        redFirst: redTurn,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        numReady: 0,
        numPlayers: 0,
        active: true,
        players: [],
        redFlipped: 0,
        blueFlipped: 0,
        winner: null
      });
    }
  });
  addWords(gameCode, redTurn);
  const id = addPlayer(gameCode, name);
  return { gameCode, id };
}

function checkValid(gameCode) {
  const db = firebase_.firestore();
  return db
    .collection("games")
    .doc(gameCode)
    .get()
    .then(doc => doc.exists)
    .catch(err => console.log(err));
}

function wordComp(a, b) {
  const nameA = a.value.toUpperCase();
  const nameB = b.value.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

function monitorWords(gameCode, setWords) {
  const db = firebase_.firestore();
  return db
    .collection("words")
    .where("gameCode", "==", gameCode)
    .onSnapshot((querySnapshot) => {
      const words = [];
      querySnapshot.forEach(doc => words.push(doc.data()));
      setWords(words);
    });
}

function monitorPlayers(gameCode, setPlayers) {
  const db = firebase_.firestore();
  return db
    .collection("players")
    .where("gameCode", "==", gameCode)
    .onSnapshot((querySnapshot) => {
      const players = [];
      querySnapshot.forEach(doc => {
        const withId = doc.data();
        withId.id = doc.id;
        players.push(withId);
      });
      setPlayers(players);
    });
}

function monitorPlayer(id) {
  const db = firebase_.firestore();
  return db
    .collection("players")
    .doc(id)
    .get()
    .then(doc => doc.data());
}

function monitorGame(code) {
  const db = firebase_.firestore();
  return db
    .collection("games")
    .doc(code)
    .get()
    .then(doc => doc.data());
}

export {
  genCode, addPlayer, addWords, createGame, checkValid, wordComp, monitorWords, monitorPlayer, monitorGame, monitorPlayers
};
