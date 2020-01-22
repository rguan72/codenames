import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { types } from "../constants";

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
  },
  mar: {
    margin: 15
  },
  pad: {
    padding: 30
  },
  colored: {
    backgroundColor: props => (props.word ? types[props.word.type] : "#ffffff")
  },
  basis: {
    minHeight: 101.6,
  },
  disabled: {
    backgroundColor: "#e0e0e0",
    color: "#bfbfbf"
  }
}));

export default function GameCard(props) {
  const {
    word, disabled, onClick
  } = props;
  const classes = useStyles(props);
  if (!word) {
    return (
      <Card className={`${classes.mar} ${classes.center}`}>
        <CardActionArea
          className={disabled ? `${classes.pad} ${classes.disabled}` : `${classes.pad}`}
          onClick={onClick}
          disabled={disabled}
        >
          <Typography variant="h4" />
        </CardActionArea>
      </Card>
    );
  }
  if (!word.flipped) {
    return (
      <Card className={`${classes.mar} ${classes.center}`}>
        <CardActionArea
          className={disabled ? `${classes.pad} ${classes.disabled}` : `${classes.pad}`}
          onClick={onClick}
          disabled={disabled}
        >
          <Typography variant="h4">{word ? word.value : ""}</Typography>
        </CardActionArea>
      </Card>
    );
  }
  return (
    <Card className={`${classes.colored} ${classes.basis} ${classes.mar}`}>
      {" "}
      <Typography variant="h4"> &nbsp; </Typography>
      {" "}
    </Card>
  );
}
