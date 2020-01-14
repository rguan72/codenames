import React from "react";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  noMarBot: {
    marginBottom: 0
  }
});

export default function PlayAgain({ onClick }) {
  const classes = useStyles();
  return (
    <Button
      component={Link}
      size="large"
      onClick={onClick}
    >
      <Typography variant="h5" className={classes.noMarBot}>
        Play Again
      </Typography>
    </Button>
  );
}
