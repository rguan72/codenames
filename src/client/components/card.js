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
    backgroundColor: props => types[props.type]
  },
  basis: {
    minHeight: 130,
  }
}));

export default function GameCard(props) {
  const [flipped, setFlipped] = useState(false);
  const classes = useStyles(props);
  if (!flipped) {
    return (
      <Card className={`${classes.mar} ${classes.center}`}>
        <CardActionArea className={classes.pad} onClick={() => setFlipped(true)}>
          <Typography variant="h2">{props.name}</Typography>
        </CardActionArea>
      </Card>
    );
  }
  return <Card className={`${classes.colored} ${classes.basis} ${classes.mar}`}> &nbsp; </Card>;
}
