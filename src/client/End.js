import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Guide from "./components/guide";

const useStyles = makeStyles({
  marL1: {
    marginLeft: 10
  },
});

export default function End(props) {
  const { words, win } = props.location.state;
  const classes = useStyles();
  const statement = win ? "You Win!" : "You Lose";
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Typography variant="h3" className={classes.marL1}>
          {statement}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" ml={2} mb={1}>
          <Link component={RouterLink} to="/">
            <Typography variant="h6"> Play Again </Typography>
          </Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box m={2}>
          <Guide color="red" words={words} />
        </Box>
        <Box m={2}>
          <Guide color="blue" words={words} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box m={2} mt={0}>
          <Guide color="black" words={words} />
        </Box>
        <Box m={2} mt={0}>
          <Guide color="beige" words={words} />
        </Box>
      </Box>
    </div>
  );
}
