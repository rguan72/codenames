import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 20,
    marginLeft: 30
  },
  field: {
    marginTop: 140,
    marginLeft: "10vw"
  },
  left40: {
    marginLeft: "10vw"
  },
  noDecor: {
    textDecoration: "none"
  },
  noLeft: {
    marginLeft: 0
  }
}));

export default function NameField({
  onClick, onEnter, buttonLabel, name, setName, disabled
}) {
  const classes = useStyles();
  return (
    <div>
      <Box flexDirection="row" mt="15vh">
        <TextField
          id="outlined-basic"
          label="Name"
          size="medium"
          value={name}
          className={classes.field}
          onKeyDown={(e) => onEnter(e)}
          onChange={event => {
            setName(event.target.value);
          }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={onClick}
          className={`${classes.field} ${classes.noLeft}`}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
      </Box>
      {name === "" && (
        <Typography
          variant="h6"
          className={`${classes.left40} ${classes.nonamehide}`}
        >
          Please set your name!
        </Typography>
      )}
    </div>
  );
}
