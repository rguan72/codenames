import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TopBar from "./components/topbar";
import { addPlayer, checkValid, genID } from "./utils";
import { logJoinGame } from "./analytics";

const useStyles = makeStyles({
  mar: {
    margin: 40
  },
  marTop: {
    marginTop: 150
  },
  marBotZero: {
    marginBottom: 0
  },
  marTopSm: {
    marginTop: 9
  },
  noMarRight: {
    marginRight: 0
  }
});

export default function Join({ location }) {
  const [code, setCode] = useState("INVALIDFILLER");
  const [valid, setValid] = useState(false);
  const [done, setDone] = useState(false);
  const [pid, setPID] = useState("");
  let name;

  if (location.name) name = location.name;
  else name = sessionStorage.getItem("name");
  const classes = useStyles();

  return !done ? (
    <div>
      <TopBar />
      <Typography variant="h3" className={classes.mar}>
        {" "}
        Welcome,
        {" "}
        {name}
      </Typography>
      <TextField
        label="Game Code"
        className={`${classes.mar} ${classes.marTop} ${classes.noMarRight} ${classes.marBotZero}`}
        onChange={event => {
          const formVal = event.target.value;
          if (formVal.length === 4) {
            checkValid(formVal).then(validity => setValid(validity));
            setCode(formVal);
          } else setValid(false);
        }}
      />
      <Button
        variant="contained"
        size="large"
        className={classes.marTop}
        disabled={!valid}
        onClick={() => {
          logJoinGame();
          const id = genID();
          addPlayer(code, id, name);
          setPID(id);
          setDone(true);
        }}
      >
        Join
      </Button>
      { !valid && <Typography variant="h6" className={`${classes.mar} ${classes.marTopSm}`}> Game Code does not exist </Typography> }
    </div>
  ) : <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />;
}
