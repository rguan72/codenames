import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import Guide from "./components/guide";
import { monitorWords, monitorGame } from "./utils";
import { teams } from "./constants";

export default function Spymaster(props) {
  const [words, setWords] = useState([]);
  const [game, setGame] = useState({});
  const { code } = props.match.params;
  const { team } = props.location.state;

  useEffect(() => {
    const unsubscribe = monitorWords(code, setWords);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = monitorGame(code, setGame);
    return () => unsubscribe();
  }, []);

  if (game.winner && team === game.winner) return <Redirect to={{ pathname: "/end", state: { words, win: true } }} />;
  if (game.winner && team !== game.winner) return <Redirect to={{ pathname: "/end", state: { words, win: false } }} />;

  const turnString = ((game.redTurn && team === teams.RED) || (!game.redTurn && team === teams.BLUE)) ? "Your Turn" : "Their Turn";

  return (
    <div>
      <Box display="flex" justifyContent="center" mt={2}>
        <FontAwesomeIcon icon="brain" color={team} size="2x" />
        <Box m={1} mt={0}>
          <Typography variant="h6">
            {turnString}
          </Typography>
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
  );
}
