import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TopBar from "./components/topbar";
import NameField from "./components/namefield";
import {
  createGame,
  createPlayer,
  genCode,
  genID,
  redTurn,
  addPlayerToGame,
  addWords
} from "./utils";
import wordList from "./wordList";
import {
  logNewGame, logClassicWords, logValentineWords, logEECSWords
} from "./analytics";
import { keyCodes, wordPacks } from "./constants";

export default function CreateNameForm() {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [code, setCode] = useState("");
  const [pid, setPID] = useState("");
  const [wordPack, setWordPack] = useState(wordPacks.CLASSIC);
  const [disabled, setDisabled] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    setDisabled(name === "");
  }, [name]);

  function newGameClick() {
    setDisabled(true);
    logNewGame();
    const gameCode = genCode();
    const id = genID();
    const isRedTurn = redTurn();
    createPlayer(gameCode, id, name);
    createGame(gameCode, isRedTurn).then(() => {
      addWords(gameCode, isRedTurn, wordList[wordPack]);
      addPlayerToGame(gameCode, id).then(() => { if (!done) { setDisabled(false); } });
      if (wordPack === wordList.CLASSIC) { logClassicWords(); } else if (wordPack === wordPacks.VALENTINE) { logValentineWords(); } else if (wordPack === wordPacks.EECS) { logEECSWords(); }
    });
    setCode(gameCode);
    setPID(id);
    setDone(true);
  }

  function onEnter(e) {
    if (e.keyCode === keyCodes.ENTER && !disabled) {
      newGameClick();
    }
  }

  return !done ? (
    <div>
      <TopBar />
      <NameField
        name={name}
        setName={setName}
        buttonLabel="Create"
        onClick={newGameClick}
        onEnter={onEnter}
        disabled={disabled}
      />
    </div>
  ) : (
    <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />
  );
}
