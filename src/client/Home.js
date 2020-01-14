import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import OutLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { createGame, genCode, addPlayer } from "./utils";

const useStyles = makeStyles(() => ({
  bar: {
    padding: 10,
    margin: 0,
    flexGrow: 1,
    maxWidth: 10,
    textDecoration: "none",
  },
  button: {
    marginTop: 20,
    marginLeft: 30
  },
  field: {
    marginTop: 200,
    marginLeft: 30
  },
  left30: {
    marginLeft: 30
  },
  noDecor: {
    textDecoration: "none"
  }
}));


export default function Home() {
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [code, setCode] = useState("");
  const [pid, setPID] = useState("");
  const [done, setDone] = useState(false);
  const props = { name };
  const classes = useStyles(props);

  useEffect(() => {
    sessionStorage.setItem("name", name);
  }, [name]);

  return !done ? (
    <div>
      <TextField
        id="outlined-basic"
        label="Name"
        size="medium"
        className={classes.field}
        onChange={event => {
          setName(event.target.value);
        }}
      />
      <Box flexDirection="row">
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            const gameCode = genCode();
            createGame(gameCode, name);
            const id = addPlayer(gameCode, name);
            setCode(gameCode);
            setPID(id);
            setDone(true);
          }}
          className={classes.button}
          disabled={name === ""}
        >
          New Game
        </Button>
        <Link to={{ pathname: "/join", name }} className={classes.noDecor} onClick={e => { if (name === "") e.preventDefault(); }}>
          <Button
            variant="contained"
            size="large"
            className={classes.button}
            disabled={name === ""}
          >
            Join Game
          </Button>
        </Link>
      </Box>
      {name === "" && (
        <Typography
          variant="h6"
          className={`${classes.left30} ${classes.nonamehide}`}
        >
          Please set your name!
        </Typography>
      )}
      <Box display="flex" flexDirection="column" ml={3.5} mt={35}>
        <Typography variant="subtitle2">
          Created by
          {" "}
          <OutLink href="https://richardguan.me"> Richard Guan </OutLink>
        </Typography>
        <Typography variant="subtitle2">
          <OutLink href="https://forms.gle/R14RCRm8mnCBWGuC6">
            {" "}
            Make a suggestion
            {" "}
          </OutLink>
        </Typography>
        <Typography variant="subtitle2">
          <OutLink href="https://github.com/rguan72/codenames">
            {" "}
            View on GitHub
            {" "}
          </OutLink>
        </Typography>
      </Box>
    </div>
  ) : (
    <Redirect to={{ pathname: `/lobby/${code}/${pid}`, name }} />
  );
}
