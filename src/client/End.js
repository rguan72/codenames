import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Guide from "./components/guide";
import TopBar from "./components/topbar";
import PlayAgain from "./components/playAgain";
import {
  getGameRef, createGame, addPlayer, genID, redTurn, addWords
} from "./utils";

const useStyles = makeStyles({
  marL1: {
    marginLeft: 10
  },
});

export default function End({ location, match }) {
  const { code, id } = match.params;
  const [done, setDone] = useState(false);
  const [nextId, setNextId] = useState("");
  const [nextCode, setNextCode] = useState("");
  const classes = useStyles();
  let words; let win; let name; let team; let role;
  if (!location.state) {
    words = JSON.parse(sessionStorage.getItem("words"));
    win = JSON.parse(sessionStorage.getItem("win"));
    name = sessionStorage.getItem("name");
    team = sessionStorage.getItem("team");
    role = sessionStorage.getItem("role");
  } else {
    words = location.state.words;
    win = location.state.win;
    name = location.state.name;
    team = location.state.team;
    role = location.state.role;
  }
  const statement = win ? "You Win!" : "You Lose";

  useEffect(() => {
    const createNextGame = async () => {
      const ref = await getGameRef(code);
      const data = ref.data();
      setNextCode(data.nextCode);
      if (data.players[0] === id) {
        const nextRef = await getGameRef(data.nextCode);
        if (!nextRef.exists) {
          const isRedTurn = redTurn();
          createGame(data.nextCode, isRedTurn);
          addWords(data.nextCode, isRedTurn);
        }
      }
    };
    createNextGame();
  }, []);

  return !done ? (
    <div>
      <TopBar link />
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Typography variant="h3" className={classes.marL1}>
          {statement}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" ml={2} mb={1}>
          <PlayAgain
            onClick={() => {
              const newId = genID();
              setNextId(newId);
              addPlayer(nextCode, newId, name, { team, role });
              setDone(true);
            }
            }
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box m={2}>
          <Guide color="red" words={words} />
        </Box>
        <Box m={2}>
          <Guide color="blue" words={words} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box m={2} mt={0}>
          <Guide color="black" words={words} />
        </Box>
        <Box m={2} mt={0}>
          <Guide color="beige" words={words} />
        </Box>
      </Box>
    </div>
  ) : (
    <Redirect to={{
      pathname: `/lobby/${nextCode}/${nextId}`, name, team, role
    }}
    />
  );
}
