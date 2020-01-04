import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import GameCard from "./card";

const useStyles = makeStyles({
  marTop: {
    marginTop: 70,
  },
  marBot: {
    marginBottom: 70,
  }
});

export default function Board({ words, code, disabled }) {
  const classes = useStyles();
  return (
    <Box>
      <GameCard
        word={words[0]}
        code={code}
        disabled={disabled}
      />
      <GameCard
        word={words[1]}
        code={code}
        disabled={disabled}
      />
      <GameCard
        word={words[2]}
        code={code}
        disabled={disabled}
      />
      <GameCard
        word={words[3]}
        code={code}
        disabled={disabled}
      />
    </Box>
  );
}
