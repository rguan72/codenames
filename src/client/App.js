import React from "react";
import { HashRouter, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./Home";
import Lobby from "./Lobby";
import Guesser from "./Guesser";
import "./app.css";

const useStyles = makeStyles(() => ({
  bar: {
    fontSize: 30,
    padding: 20,
    backgroundColor: "#7c134d",
    fontFamily: "Roboto",
  },
  theme: {
    fontFamily: "sans-serif"
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        Codenames
      </AppBar>
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/lobby/:code" component={Lobby} />
        <Route path="/game" component={Guesser} />
      </HashRouter>
    </div>
  );
}
