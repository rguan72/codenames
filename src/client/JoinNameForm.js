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

export default function JoinNameForm(props) {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [pid, setPID] = useState("");
  const [done, setDone] = useState(false);
  const { code } = props.match.params;
  useEffect(() => {
    sessionStorage.setItem("name", name);
  }, [name]);

  async function joinGameClick() {
    const query = await getPlayerRef(code, name);
    if (query.size > 0) {
      logRejoinGame();
      setRemoteGame(code, { started: false });
      setPID(query.docs[0].id);
      setDone(true);
    } else {
      logJoinGame();
      const id = genID();
      addPlayer(code, id, name);
      setPID(id);
      setDone(true);
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
      />
    </div>
  ) : (
    <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />
  );
}
