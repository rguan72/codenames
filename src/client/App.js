import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import Lobby from "./Lobby";
import Operative from "./Operative";
import Spymaster from "./Spymaster";
import End from "./End";
import Join from "./Join";
import CreateNameForm from "./CreateNameForm";
import JoinNameForm from "./JoinNameForm";

import "./app.css";

export default function App() {
  return (
    <div>
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/name/create" component={CreateNameForm} />
        <Route path="/name/join/:code" component={JoinNameForm} />
        <Route path="/lobby/:code/:id" component={Lobby} />
        <Route path="/operative/:code/:id" component={Operative} />
        <Route path="/spymaster/:code/:id" component={Spymaster} />
        <Route path="/end/:code/:id" component={End} />
        <Route path="/join" component={Join} />
      </HashRouter>
    </div>
  );
}
