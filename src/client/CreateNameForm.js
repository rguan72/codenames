import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TopBar from "./components/topbar";
import NameField from "./components/namefield";
import {
  createGame,
  createPlayer,
  addWords,
  genCode,
  genID,
  redTurn,
  addPlayerToGame,
} from "./utils";
import { logNewGame } from "./analytics";
import wordList from "./wordList";

export default function CreateNameForm() {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [code, setCode] = useState("");
  const [pid, setPID] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("name", name);
  }, [name]);

  function newGameClick() {
    logNewGame();
    const gameCode = genCode();
    const id = genID();
    const isRedTurn = redTurn();
    createPlayer(gameCode, id, name);
    createGame(gameCode, isRedTurn).then(() => {
      addWords(gameCode, isRedTurn, wordList.valentine);
      addPlayerToGame(gameCode, id);
    });
    setCode(gameCode);
    setPID(id);
    setDone(true);
  }

  return !done ? (
    <div>
      <TopBar />
      <NameField
        name={name}
        setName={setName}
        buttonLabel="Create"
        onClick={newGameClick}
      />
    </div>
  ) : (
    <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />
  );
}
