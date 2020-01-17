import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import Guide from "./components/guide";
import TopBar from "./components/topbar";
import { monitorWords, monitorGame } from "./utils";
import { teams, roles } from "./constants";

export default function Spymaster(props) {
  const [words, setWords] = useState([]);
  const [game, setGame] = useState({});
  const { code, id } = props.match.params;
  let team;
  let name;
  if (!props.location.state) {
    team = sessionStorage.getItem("team");
    name = sessionStorage.getItem("name");
  } else {
    team = props.location.state.team;
    name = props.location.state.name;
  }

  useEffect(() => {
    const unsubscribe = monitorWords(code, setWords);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = monitorGame(code, setGame);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    sessionStorage.setItem("role", roles.SPYMASTER);
  });

  if (game.winner && team === game.winner) {
    sessionStorage.setItem("win", true);
    return (
      <Redirect to={{
        pathname: `/end/${code}/${id}`,
        state: {
          words, win: true, name, team, role: roles.SPYMASTER
        }
      }}
      />
    );
  }
  if (game.winner && team !== game.winner) {
    sessionStorage.setItem("win", false);
    return (
      <Redirect to={{
        pathname: `/end/${code}/${id}`,
        state: {
          words, win: false, name, team, role: roles.SPYMASTER
        }
      }}
      />
    );
  }

  const turnString = ((game.redTurn && team === teams.RED) || (!game.redTurn && team === teams.BLUE)) ? "Your Turn" : "Their Turn";

  return (
    <div>
      <TopBar />
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
