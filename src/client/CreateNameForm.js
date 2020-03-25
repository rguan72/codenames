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
  addPlayerToGame
} from "./utils";
import { logNewGame } from "./analytics";
import { keyCodes } from "./constants";

export default function CreateNameForm() {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [code, setCode] = useState("");
  const [pid, setPID] = useState("");
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
    createGame(gameCode, isRedTurn).then(() => addPlayerToGame(gameCode, id)).then(() => { if (!done) { setDisabled(false); } });
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
