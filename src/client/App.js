import React from "react";
import { HashRouter, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./Home";
import Lobby from "./Lobby";
import Operative from "./Operative";
import Join from "./Join";
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
        <Route path="/lobby/:code/:id" component={Lobby} />
        <Route path="/operative/:code/:id" component={Operative} />
        <Route path="/spymaster/:code/:id" component={Operative} />
        <Route path="/join" component={Join} />
      </HashRouter>
    </div>
  );
}
