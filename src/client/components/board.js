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
        type={words[0].type}
        name={words[0].value}
        code={code}
        disabled={disabled}
      />
      <GameCard
        type={words[1].type}
        name={words[1].value}
        code={code}
        disabled={disabled}
      />
      <GameCard
        type={words[2].type}
        name={words[2].value}
        code={code}
        disabled={disabled}
      />
      <GameCard
        type={words[3].type}
        name={words[3].value}
        code={code}
        disabled={disabled}
      />
    </Box>
  );
}
