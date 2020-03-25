import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TopBar from "./components/topbar";
import NameField from "./components/namefield";
import {
  genID,
  addPlayer,
  setRemoteGame,
  getPlayerRef
} from "./utils";
import { logJoinGame, logRejoinGame } from "./analytics";
import { keyCodes } from "./constants";

export default function JoinNameForm(props) {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [pid, setPID] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [done, setDone] = useState(false);
  const { code } = props.match.params;

  useEffect(() => {
    sessionStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    setDisabled(name === "");
  }, [name]);

  async function joinGameClick() {
    setDisabled(true);
    const query = await getPlayerRef(code, name);
    if (query.size > 0) {
      logRejoinGame();
      setRemoteGame(code, { started: false }).then(() => { setDisabled(false); });
      setPID(query.docs[0].id);
      setDone(true);
    } else {
      logJoinGame();
      const id = genID();
      addPlayer(code, id, name).then(() => { setDisabled(false); });
      setPID(id);
      setDone(true);
    }
  }

  function onEnter(e) {
    if (e.keyCode === keyCodes.ENTER && !disabled) {
      joinGameClick();
    }
  }

  return !done ? (
    <div>
      <TopBar />
      <NameField
        name={name}
        setName={setName}
        buttonLabel="Join"
        onClick={joinGameClick}
        onEnter={onEnter}
        disabled={disabled}
      />
    </div>
  ) : (
    <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />
  );
}
