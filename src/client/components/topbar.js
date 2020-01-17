import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  bar: {
    fontSize: 30,
    padding: 20,
    backgroundColor: "#7c134d",
    fontFamily: "Roboto",
  },
  nodec: {
    textDecoration: "none",
    color: "white"
  }
}));

export default function TopBar({ link }) {
  const classes = useStyles();
  if (!link) {
    return (
      <AppBar position="static" className={classes.bar}>
          Codenames
      </AppBar>
    );
  }
  return (
    <AppBar position="static" className={classes.bar}>
      <Link to="/" className={classes.nodec}>
        Codenames
      </Link>
    </AppBar>
  );
}
