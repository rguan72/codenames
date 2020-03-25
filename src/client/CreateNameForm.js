import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NativeSelect from "@material-ui/core/NativeSelect";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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

  const handleSelectChange = event => {
    setWordPack(event.target.value);
  };

  return !done ? (
    <div>
      <TopBar />
      <Box display="block">
        <NameField
          name={name}
          setName={setName}
          buttonLabel="Create"
          onClick={newGameClick}
          onEnter={onEnter}
          disabled={disabled}
        />
      </Box>
      <Box ml="10vw" mt="6vh">
        <NativeSelect
          value={wordPack}
          onChange={handleSelectChange}
        >
          <option value={wordPacks.CLASSIC}>
            {wordPacks.CLASSIC}
          </option>
          <option value={wordPacks.VALENTINE}>
            {wordPacks.VALENTINE}
          </option>
          <option value={wordPacks.EECS}>
            {wordPacks.EECS}
          </option>
        </NativeSelect>
        <Typography variant="h6"> Select Word Pack </Typography>
      </Box>
    </div>
  ) : (
    <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />
  );
}
