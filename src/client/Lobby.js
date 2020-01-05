import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import firebase from "firebase/app";
import Player from "./components/player";
import firebase_ from "./Firebase";
import { teams, roles } from "./constants";
import { monitorPlayers, monitorGame } from "./utils";

const useStyles = makeStyles(() => ({
  margin: {
    margin: 15
  },
  marginCode: {
    marginTop: 5,
  },
  plMargin: {
    margin: 40,
    marginTop: 15
  },
  marginSub: {
    marginLeft: 15
  }
}));

export default function Lobby(props) {
  const classes = useStyles();
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState(teams.RED);
  const [role, setRole] = useState(roles.SPYMASTER);
  const [ready, setReady] = useState(false);
  const [game, setGame] = useState({});
  const { id, code } = props.match.params;

  useEffect(() => {
    const unsubscribe = monitorPlayers(code, setPlayers);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = monitorGame(code, setGame);
    return () => unsubscribe();
  }, []);

  function setPlayerTeam(selTeam) {
    const db = firebase_.firestore();
    db.collection("players")
      .doc(id)
      .update({ team: selTeam });
  }

  function setPlayerRole(selRole) {
    const db = firebase_.firestore();
    db.collection("players")
      .doc(id)
      .update({ role: selRole });
  }

  function setPlayerReady(selReady) {
    const db = firebase_.firestore();
    db.collection("players")
      .doc(id)
      .update({ ready: selReady });
    if (selReady) db.collection("games").doc(code).update({ numReady: firebase.firestore.FieldValue.increment(1) });
    else db.collection("games").doc(code).update({ numReady: firebase.firestore.FieldValue.increment(-1) });
  }

  function handleClick(e, areAllReady) {
    if (!areAllReady) e.preventDefault();
  }

  const allReady = game && game.numPlayers > 0 && game.numReady === game.numPlayers;

  const playerItems = players.map(player => (
    <Box m={4} mt={2} key={player.id}>
      <Player
        team={player.team}
        pos={player.role}
        name={player.name}
        ready={player.ready}
      />
    </Box>
  ));
  return (
    <div>
      <Box display="flex" mb={-2}>
        <Typography variant="h4" className={classes.margin}>
          Game Code:
        </Typography>
        <Typography variant="h3" className={classes.marginCode}>
          {code}
        </Typography>
      </Box>
      <Box ml={2} mb={4}>
        <Typography variant="subtitle1"> Waiting for players... </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        {playerItems}
      </Box>
      <Box display="flex" m={4} justifyContent="center">
        <NativeSelect
          value={team}
          onChange={event => {
            setTeam(event.target.value);
            setPlayerTeam(event.target.value);
          }}
          className={classes.margin}
        >
          <option value="red"> Red </option>
          <option value="blue"> Blue </option>
        </NativeSelect>
        <NativeSelect
          value={role}
          onChange={event => {
            setRole(event.target.value);
            setPlayerRole(event.target.value);
          }}
          className={classes.margin}
        >
          <option value={roles.SPYMASTER}> Spymaster </option>
          <option value={roles.OPERATIVE}> Operative </option>
        </NativeSelect>
      </Box>
      <Box display="flex" justifyContent="center" m={4}>
        <FormControlLabel
          control={(
            <Switch
              checked={ready}
              onChange={event => {
                setReady(event.target.checked);
                setPlayerReady(event.target.checked);
              }}
              value="ready"
              color="primary"
            />
          )}
          label="Ready"
        />
        <Link to={{ pathname: `/${role}/${code}/${id}`, state: { team } }} onClick={(e) => handleClick(e, allReady)} style={{ textDecoration: "none" }}>
          <Button disabled={!allReady} variant="contained">Start</Button>
        </Link>
      </Box>
    </div>
  );
}
