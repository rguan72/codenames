import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TopBar from "./components/topbar";
import { checkValid } from "./utils";
import { keyCodes } from "./constants";


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
  },
  noDecor: {
    textDecoration: "none"
  }
});

export default function Join({ history }) {
  const [code, setCode] = useState("INVALIDFILLER");
  const [valid, setValid] = useState(false);
  const classes = useStyles();

  function onEnterPress(e) {
    if (e.keyCode === keyCodes.ENTER && valid) {
      history.push(`/name/join/${code}`);
    }
  }

  return (
    <div>
      <TopBar />
      <Box mt="15vh">
        <TextField
          autoComplete="off"
          inputProps={{
            autoCapitalize: "none"
          }}
          label="Game Code"
          className={`${classes.mar} ${classes.marTop} ${classes.noMarRight} ${classes.marBotZero}`}
          onChange={event => {
            const formVal = event.target.value;
            if (formVal.length === 4) {
              setCode(formVal);
              checkValid(formVal).then(validity => setValid(validity));
            } else setValid(false);
          }}
          onKeyDown={e => { onEnterPress(e); }}
        />
        <Link to={`/name/join/${code}`} className={classes.noDecor} onClick={(e) => { if (!valid) e.preventDefault(); }}>
          <Button
            variant="contained"
            size="large"
            className={classes.marTop}
            disabled={!valid}
          >
          Next
          </Button>
        </Link>
        {!valid && (
        <Typography
          variant="h6"
          className={`${classes.mar} ${classes.marTopSm}`}
        >
          {" "}
          Game Code does not exist
          {" "}
        </Typography>
        )}
      </Box>
    </div>
  );
}
