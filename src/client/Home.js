import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import OutLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "./components/topbar";

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 20,
    marginLeft: 30
  },
  noDecor: {
    textDecoration: "none"
  },
  min70: {
    minWidth: 70
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <TopBar />
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        mt={14}
      >
        <FontAwesomeIcon icon="brain" size="7x" color="#7c134d" />
        <FontAwesomeIcon icon="user-secret" size="7x" color="#7c134d" />
      </Box>
      <Box display="flex" justifyContent="space-evenly" mt={14}>
        <Link to={{ pathname: "/join" }} className={classes.noDecor}>
          <Button variant="contained" size="large" className={classes.button}>
            Join Game
          </Button>
        </Link>
        <Link to="/name/create" className={classes.noDecor}>
          <Button variant="contained" size="large" className={classes.button}>
            New Game
          </Button>
        </Link>
      </Box>
      <Box display="flex" justifyContent="space-evenly" mt="14vh">
        <Box flexDirection="column">
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
        <Box className={classes.min70} />
      </Box>
    </div>
  );
}
