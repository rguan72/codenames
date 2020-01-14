import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Guide from "./components/guide";
import PlayAgain from "./components/playAgain";
import { getGameRef, createGame, addPlayer } from "./utils";

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
  let words; let win; let name;
  if (!location.state) {
    words = JSON.parse(sessionStorage.getItem("words"));
    win = sessionStorage.getItem("win");
    name = sessionStorage.getItem("name");
  } else {
    words = location.state.words;
    win = location.state.win;
    name = location.state.name;
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
          createGame(data.nextCode);
        }
      }
    };
    createNextGame();
  }, []);

  return !done ? (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Typography variant="h3" className={classes.marL1}>
          {statement}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" ml={2} mb={1}>
          <PlayAgain
            onClick={() => {
              setNextId(addPlayer(nextCode, name));
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
  ) : <Redirect to={{ pathname: `/lobby/${nextCode}/${nextId}`, name }} />;
}
