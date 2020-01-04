import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { types } from "../constants";
import { wordComp } from "../utils";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f5f5f5"
  },
  colored: {
    color: props => props.color
  },
  strike: {
    textDecoration: "line-through"
  },
});

const exprs = {
  red: "Red Agent",
  blue: "Blue Agent",
  black: "Assassin",
  beige: "Bystander"
};

export default function Guide({ color, words }) {
  const upperColor = color.toUpperCase();
  const classes = useStyles({ color: types[upperColor] });
  let wordS = "Words";
  if (color === "black") wordS = "Word";
  if (words === undefined || words.length === 0) {
    return (
      <div>
        <Typography variant="h5">
          <span className={classes.colored}>
            {" "}
            {exprs[color]}
            {" "}
          </span>
          {wordS}
        </Typography>
        <List className={classes.root}>
          &nbsp;
        </List>
      </div>
    );
  }
  words.sort(wordComp);
  const wordVals = words
    .filter(word => word.type === upperColor)
    .map(word => (
      <Typography className={word.flipped ? classes.strike : ""} key={word.value}>
        <ListItem divider>
          {" "}
          {word.value}
          {" "}
        </ListItem>
      </Typography>
    ));
  return (
    <div>
      <Typography variant="h5">
        <span className={classes.colored}>
          {" "}
          {exprs[color]}
          {" "}
        </span>
        {wordS}
      </Typography>
      <List className={classes.root}>
        {wordVals}
      </List>
    </div>
  );
}
