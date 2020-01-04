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

export default function Board({ words }) {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.marBot}>
        <GameCard type="RED" name="field" />
        <GameCard type="BEIGE" name="axle" />
      </Box>
      <Box className={classes.marTop}>
        <GameCard type="BLACK" name="cool" />
        <GameCard type="BLUE" name="bros" />
      </Box>
    </Box>
  );
}
