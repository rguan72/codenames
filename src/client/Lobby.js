import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Player from "./components/player";
import firebase_ from "./Firebase";
import { teams, roles } from "./constants";

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
  const [allReady, setAllReady] = useState(false);
  const { id, code } = props.match.params;

  function monitorLobby() {
    const db = firebase_.firestore();
    db.collection("games")
      .doc(code)
      .onSnapshot((doc) => {
        const promises = [];
        const playerSnap = doc.data().players;
        for (let i = 0; i < playerSnap.length; i += 1) {
          promises.push(
            db
              .collection("players")
              .doc(playerSnap[i])
              .get()
              .then(pdoc => { const withId = pdoc.data(); withId.id = pdoc.id; return withId; })
              .catch(err => console.log(err))
          );
        }
        Promise.all(promises).then(arr => {
          setAllReady(arr.length > 3 && arr.map(pl => pl.ready).every(isReady => isReady));
          return setPlayers(arr);
        });
      });
  }

  function monitorPlayer() {
    const db = firebase_.firestore();
    db.collection("players")
      .doc(id)
      .onSnapshot((doc) => {
        const playerSnap = doc.data();
        setTeam(playerSnap.team);
        setRole(playerSnap.role);
        setReady(playerSnap.ready);
      });
  }

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
  }

  useEffect(monitorLobby);
  useEffect(monitorPlayer);

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
          onChange={event => setPlayerTeam(event.target.value)}
          className={classes.margin}
        >
          <option value="red"> Red </option>
          <option value="blue"> Blue </option>
        </NativeSelect>
        <NativeSelect
          value={role}
          onChange={event => setPlayerRole(event.target.value)}
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
              onChange={event => setPlayerReady(event.target.checked)}
              value="ready"
              color="primary"
            />
          )}
          label="Ready"
        />
        <Link to={`/${role}/${code}/${id}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" disabled={!allReady}>
            Start
          </Button>
        </Link>
      </Box>
    </div>
  );
}
