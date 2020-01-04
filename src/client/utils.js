import firebase from "firebase/app";
import firebase_ from "./Firebase";
import { wordList } from "./wordList";
import { teams, roles } from "./constants";


function genCode() {
  let code = "";
  for (let i = 0; i < 4; ++i) {
    const randint = Math.floor(Math.random() * 36);
    const asciiOffset = 87;
    if (randint < 10) code += randint;
    else code += String.fromCharCode(randint + asciiOffset);
  }
  return code;
}

function addPlayer(gameCode, name) {
  const db = firebase_.firestore();
  return db.collection("players")
    .add({
      name,
      gameCode,
      team: teams.RED,
      role: roles.SPYMASTER,
      ready: false,
      created: Date.now()
    })
    .then(ref => {
      db
        .collection("games")
        .doc(gameCode)
        .update({
          players: firebase.firestore.FieldValue.arrayUnion(ref.id),
          numPlayers: firebase.firestore.FieldValue.increment(1),
        });
      return ref.id;
    })
    .catch(err => console.log(err));
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
        created: Date.now()
      })
      .then(ref => wordHashes.push(ref.id))
  );
  for (let i = 1; i < 5; ++i) {
    promises.push(
      db
        .collection("words")
        .add({
          value: wordList[arr[i]],
          type: "BEIGE",
          flipped: false,
          created: Date.now()
        })
        .then(ref => wordHashes.push(ref.id))
    );
  }
  for (let i = 5; i < 12; ++i) {
    promises.push(
      db
        .collection("words")
        .add({
          value: wordList[arr[i]],
          type: "RED",
          flipped: false,
          created: Date.now()
        })
        .then(ref => wordHashes.push(ref.id))
    );
  }
  for (let i = 12; i < 19; ++i) {
    promises.push(
      db
        .collection("words")
        .add({
          value: wordList[arr[i]],
          type: "BLUE",
          flipped: false,
          created: Date.now()
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
        created: Date.now()
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
  let newCode = false;
  const gameCode = genCode();
  //   while (!newCode) {
  const docRef = db.collection("games").doc(gameCode);
  const redTurn = Math.random() > 0.5;
  docRef.get().then(doc => {
    if (!doc.exists || doc.data().active === false) {
      docRef.set({
        redTurn,
        created: Date.now(),
        numReady: 0,
        numPlayers: 0,
        active: true,
        players: []
      });
      newCode = true;
    }
  });
  addWords(gameCode, redTurn);
  return addPlayer(gameCode, name)
    .then(id => ({ gameCode, id }))
    .catch(err => console.log(err));
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

async function monitorWords(gameCode) {
  const db = firebase_.firestore();
  const wordHashes = await db
    .collection("games")
    .doc(gameCode)
    .get()
    .then(doc => doc.data().words);
  const promises = wordHashes.map(hash => db
    .collection("words")
    .doc(hash)
    .get()
    .then(ref => ref.data()));
  return Promise.all(promises);
}

export {
  genCode, addPlayer, addWords, createGame, checkValid, wordComp, monitorWords
};
