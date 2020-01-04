import React, { useState } from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
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
  },
  disabled: {
    backgroundColor: "#e0e0e0",
    color: "#bfbfbf"
  }
}));

export default function GameCard(props) {
  const [flipped, setFlipped] = useState(false);
  const { disabled } = props;
  const classes = useStyles(props);
  if (!flipped) {
    return (
      <Card className={`${classes.mar} ${classes.center}`}>
        <CardActionArea
          className={disabled ? `${classes.pad} ${classes.disabled}` : `${classes.pad}`}
          onClick={() => setFlipped(true)}
          disabled={disabled}
        >
          <Typography variant="h2">{props.name}</Typography>
        </CardActionArea>
      </Card>
    );
  }
  return <Card className={`${classes.colored} ${classes.basis} ${classes.mar}`}> &nbsp; </Card>;
}
