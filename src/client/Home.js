import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { createGame } from "./utils";

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
  nonamehide: {
    visibility: props => (props.name === "" ? "visible" : "hidden")
  }
}));


export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  const props = { name };
  const classes = useStyles(props);
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
          onClick={() => { setCode(createGame(name)); setDone(true); }}
          className={classes.button}
          disabled={name === ""}
        >
          New Game
        </Button>
        <Link to="/game">
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
      <Typography className={`${classes.left30} ${classes.nonamehide}`}>
        Please set your name!
      </Typography>
    </div>
  ) : <Redirect to={`/lobby/${code}`} />;
}
