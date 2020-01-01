import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  margin: {
    margin: 15
  }
}));

export default function Lobby(props) {
  const classes = useStyles();
  return (
    <Box flexDirection="row">
      <Typography variant="h4" className={classes.margin}>
        Game Code:
        {" "}
        {props.match.params.code}
      </Typography>
    </Box>
  );
}
